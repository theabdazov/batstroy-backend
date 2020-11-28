import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductCharacteristicSuggestEntity } from './product-characteristic-suggest.entity';
import { plainToClass } from 'class-transformer';
import { toPromise } from '../../util/toPromise';
import { ProductCharacteristicSuggestDto } from './product-characteristic-suggest.dto';
import { ProductCharacteristicSuggestAddingDto } from './product-characteristic-suggest-adding.dto';

@Injectable()
export class ProductCharacteristicSuggestService {
  constructor(
    @InjectRepository(ProductCharacteristicSuggestEntity) private repo: Repository<ProductCharacteristicSuggestEntity>,
  ) {
  }

  async create(adding: ProductCharacteristicSuggestAddingDto): Promise<ProductCharacteristicSuggestDto> {
    const entity = plainToClass(ProductCharacteristicSuggestEntity, {
      ...this.repo.create(),
      ...adding
    });
    return this.repo.save(entity).then(
      res => toPromise(plainToClass(ProductCharacteristicSuggestDto, res)),
    );
  }

  async getById(id: number): Promise<ProductCharacteristicSuggestDto> {
    const entity: ProductCharacteristicSuggestEntity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(ProductCharacteristicSuggestDto, entity);
  }


  async update(id: number, adding: ProductCharacteristicSuggestAddingDto): Promise<ProductCharacteristicSuggestDto> {
    const entity = plainToClass(ProductCharacteristicSuggestEntity, {
      ...await this.repo.findOne(id),
      ...adding,
    });
    return this.repo.save(entity).then(
      res => toPromise(plainToClass(ProductCharacteristicSuggestDto, res)),
    );
  }

  async deleteById(id: number): Promise<ProductCharacteristicSuggestDto> {
    const dto = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(dto),
    );
  }

  getAll(): Promise<ProductCharacteristicSuggestDto[]>  {
    return this.repo.find().then(
      res => plainToClass(ProductCharacteristicSuggestDto, res),
    );
  }

  suggests(text: string): Promise<ProductCharacteristicSuggestDto[]>  {
    return this.repo.find({
      title:  Like(`%${text}%`)
    }).then(
      res => toPromise(plainToClass(ProductCharacteristicSuggestDto, res)),
    );
  }
}
