import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { SaleTypeEntity } from './entity/sale-type.entity';
import { SaleTypeAddingDto } from './dto/sale-type-adding.dto';
import { SaleTypeDto } from './dto/sale-type.dto';
import { toPromise } from '../../util/toPromise';

@Injectable()
export class SaleTypeService {
  constructor(
    @InjectRepository(SaleTypeEntity)
    private repo: Repository<SaleTypeEntity>) {
  }

  create(addingDto: SaleTypeAddingDto): Promise<SaleTypeDto> {
    const saleTypeEntity: SaleTypeEntity = plainToClass(SaleTypeEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    return this.repo.save(saleTypeEntity).then(
      res => plainToClass(SaleTypeDto, res),
    );
  }

  async getById(id: number): Promise<SaleTypeDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(SaleTypeDto, entity);
  }

  async update(id: number, addingDto: SaleTypeAddingDto): Promise<SaleTypeDto> {
    const saleTypeEntity: SaleTypeEntity = plainToClass(SaleTypeEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    return this.repo.save(saleTypeEntity).then(
      res => plainToClass(SaleTypeDto, res),
    );
  }

  async deleteById(id: number): Promise<SaleTypeDto> {
    const company = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(company),
    );
  }

  getAll() {
    return this.repo.find();
  }
}
