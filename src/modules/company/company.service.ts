import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entity/company.entity';
import { CompanyAddingDto } from './dto/company-adding.dto';
import { CompanyDto } from './dto/company.dto';
import { toPromise } from '../../util/toPromise';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(CompanyEntity)
    private repo: Repository<CompanyEntity>) {
  }

  create(addingDto: CompanyAddingDto): Promise<CompanyDto> {
    const company: CompanyEntity = plainToClass(CompanyEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    return this.repo.save(company).then(
      res => toPromise(plainToClass(CompanyDto, res)),
    );
  }

  async getById(id: number): Promise<CompanyDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(CompanyDto, entity);
  }

  async update(id: number, addingDto: CompanyAddingDto): Promise<CompanyDto> {
    const company: CompanyEntity = plainToClass(CompanyEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    return this.repo.save(company).then(
      res => toPromise(plainToClass(CompanyDto, res)),
    );
  }

  async deleteById(id: number): Promise<CompanyDto> {
    const company = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(company),
    );
  }

  getAll() {
    return this.repo.find();
  }

}
