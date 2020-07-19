import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacteristicEntity } from './entity/characteristic.entity';
import { CategoryEntity } from '../category/entity/category.entity';
import { plainToClass } from 'class-transformer';
import { toPromise } from '../../util/toPromise';
import { CharacteristicAddingDto } from './dto/characteristic-adding.dto';
import { CharacteristicDto } from './dto/characteristic.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(CharacteristicEntity) private repo: Repository<CharacteristicEntity>,
    @InjectRepository(CategoryEntity) private repoCategory: Repository<CategoryEntity>,
  ) {
  }

  async create(addingDto: CharacteristicAddingDto): Promise<CharacteristicDto> {
    const entity = plainToClass(CharacteristicEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    if (addingDto.categoryId) {
      const category = await this.repoCategory.findOne(addingDto.categoryId);
      if (category) {
        entity.category = category;
      } else {
        throw new HttpException('category not found', HttpStatus.NOT_FOUND);
      }
    }
    return this.repo.save(entity).then(
      res => toPromise(plainToClass(CharacteristicDto, res)),
    );
  }

  async getById(id: number): Promise<CharacteristicDto> {
    const entity: CharacteristicEntity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(CharacteristicDto, entity);
  }


  async getByCategoryId(categoryId: number): Promise<CharacteristicDto[]> {
    const entities: CharacteristicEntity[] = await this.repo.find({
      where: {
        category: { id: categoryId }
      },
      order: { orderNumber: 'ASC' },
    });
    return plainToClass(CharacteristicDto, entities);
  }


  async update(id: number, addingDto: CharacteristicAddingDto): Promise<CharacteristicDto> {
    const entity = plainToClass(CharacteristicEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    return this.repo.save(entity).then(
      res => toPromise(plainToClass(CharacteristicDto, res)),
    );
  }

  async deleteById(id: number): Promise<CharacteristicDto> {
    const dto = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(dto),
    );
  }

  getAll() {
    return this.repo.find().then(
      res => toPromise(plainToClass(CharacteristicDto, res)),
    );
  }
}
