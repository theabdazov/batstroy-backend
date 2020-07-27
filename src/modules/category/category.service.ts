import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { toPromise } from '../../util/toPromise';
import { plainToClass } from 'class-transformer';
import { CategoryAddingDto } from './dto/category-adding.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryNodeDto } from './dto/category-node.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    protected repo: TreeRepository<CategoryEntity>,
  ) {
  }

  async create(addingDto: CategoryAddingDto): Promise<CategoryDto> {
    const categoryEntity: CategoryEntity = plainToClass(CategoryEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    if (addingDto.parentId) {
      const parentCategory = await this.repo.findOne(addingDto.parentId);
      if (parentCategory) {
        categoryEntity.parent = parentCategory;
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
    return this.repo.save(categoryEntity).then(
      res => this.getById(res.id),
    );
  }

  async getById(id: number): Promise<CategoryDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(CategoryDto, entity);
  }

  async update(id: number, addingDto: CategoryAddingDto): Promise<CategoryDto> {
    const categoryEntity: CategoryEntity = plainToClass(CategoryEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    return this.repo.save(categoryEntity).then(
      res => toPromise(plainToClass(CategoryDto, res)),
    );
  }

  async deleteById(id: number): Promise<CategoryDto> {
    const category = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(category),
    );
  }

  getAll() {
    return this.repo.find().then(
      res => toPromise(plainToClass(CategoryDto, res)),
    );
  }

  getTrees() {
    return this.repo.findTrees().then(
      res => {
        return toPromise(this.sortTree(plainToClass(CategoryNodeDto, res)));
      },
    );
  }

  async getDescendantsTrees(id: number) {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.repo.findDescendantsTree(entity).then(
      res => toPromise(plainToClass(CategoryNodeDto, res)),
    );
  }

  async getDescendantsTreesIds(id: number): Promise<number[]> {
    const node = await this.getDescendantsTrees(id);
    if (node) {
      const ids = [];
      const recursion = (list: CategoryNodeDto[]) => {
        list.forEach(item => {
          ids.push(item.id);
          if (item.children && item.children.length) {
            recursion(item.children);
          }
        });
      };
      ids.push(node.id);
      recursion(node.children);
      return ids;
    } else {
      return [];
    }
  }

  sortTree(unsortedTree: CategoryNodeDto[]): CategoryNodeDto[] {
    const sortList = (list: CategoryNodeDto[]): CategoryNodeDto[] => {
      list.forEach(item => {
        if (item.children && item.children.length) {
          item.children = sortList(item.children);
        }
      });
      return list.sort((a, b) => {
        return a.orderNumber - b.orderNumber;
      });
    };
    return sortList(unsortedTree);
  }

}
