import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from './entity/product.entity';
import { ProductAddingDto } from './dto/product-adding.dto';
import { ProductDto } from './dto/product.dto';
import { PaginationPageDto } from '../dto/pagination-page.dto';
import { ProductFilter } from './dto/product-filter';
import { CategoryEntity } from '../category/entity/category.entity';
import { ProductFilterPublic } from './dto/product-filter-public';
import { ProductShortPublic } from './dto/product-short-public';
import { CategoryService } from '../category/category.service';
import { CharacteristicValueService } from '../characteristic-value/characteristic-value.service';
import { ProductDetailPublic } from './dto/product-detail-public';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity) private repoCategory: Repository<CategoryEntity>,
    private categoryService: CategoryService,
    private characteristicValueService: CharacteristicValueService,
  ) {
  }

  async create(addingDto: ProductAddingDto): Promise<ProductDto> {
    const product = plainToClass(ProductEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    const productEntity = await this.repo.save(product);
    if (addingDto.characteristicValues && addingDto.characteristicValues.length) {
      await this.characteristicValueService.addingMany(productEntity.id, addingDto.characteristicValues);
    }
    return this.getById(productEntity.id);
  }

  async getById(id: number): Promise<ProductDto> {
    const entity: ProductEntity = await this.repo.findOneOrFail(id);
    const characteristicValueDto = await this.characteristicValueService.getByProductId(id);
    return { ...plainToClass(ProductDto, entity), characteristicValues: characteristicValueDto };
  }

  async update(id: number, addingDto: ProductAddingDto): Promise<ProductDto> {
    const product = plainToClass(ProductEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    await this.repo.save(product);
    return this.getById(id);
  }

  async deleteById(id: number): Promise<ProductDto> {
    const product = await this.getById(id);
    return this.repo.delete(id).then(
      () => product,
    );
  }

  getProductList(adminFilter: ProductFilter): Promise<PaginationPageDto<ProductDto>> {
    const filter: FindConditions<ProductEntity> = {};
    if (adminFilter) {
      if (adminFilter.id) {
        filter.id = adminFilter.id;
      }
      if (adminFilter.name) {
        filter.name = Like(`%${adminFilter.name}%`);
      }
      if (adminFilter.categoryIds && adminFilter.categoryIds.length) {
        filter.categoryId = In(adminFilter.categoryIds);
      }
    }
    return this.repo.findAndCount({
      skip: adminFilter.page * adminFilter.count,
      take: adminFilter.count,
      where: filter,
      order: {
        id: 'ASC',
      },
    }).then(
      result => {
        return {
          data: plainToClass(ProductDto, result[0]),
          totalCount: result[1],
        };
      },
    );
  }

  async getProductListPublic(filter: ProductFilterPublic) {
    const findConditions: FindConditions<ProductEntity> = {};
    if (filter) {
      if (filter.name) {
        findConditions.name = Like(`%${filter.name}%`);
      }
      if (filter.categoryId) {
        const ids = await this.categoryService.getDescendantsTreesIds(filter.categoryId);
        findConditions.id = In(ids);
      }
    }
    return this.repo.findAndCount({
      skip: filter.page,
      take: filter.count,
      where: findConditions,
      loadEagerRelations: false,
    }).then(
      result => {
        return {
          data: plainToClass(ProductShortPublic, result[0]),
          totalCount: result[1],
        };
      },
    );
  }

  async getByIdPublic(id: number): Promise<ProductDetailPublic> {
    const entity: ProductEntity = await this.repo.findOneOrFail(id);
    const characteristicValueDto = await this.characteristicValueService.getByProductId(id);
    return { ...plainToClass(ProductDetailPublic, entity), characteristicValues: characteristicValueDto };
  }

  async getByIdsPublic(ids: number[]) {
    return this.repo.findByIds(ids).then(
      result => plainToClass(ProductShortPublic, result),
    );
  }

}
