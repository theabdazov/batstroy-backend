import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toPromise } from '../../util/toPromise';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entity/user.entity';
import { UserAddingDto } from './dto/user-adding.dto';
import { UserDto } from './dto/user.dto';
import { CompanyEntity } from '../company/entity/company.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    @InjectRepository(CompanyEntity) private companyRepo: Repository<CompanyEntity>,
  ) {
  }

  async create(userAddingDto: UserAddingDto): Promise<UserDto> {
    const user = plainToClass(UserEntity, {
      ...this.repo.create(),
      ...userAddingDto,
    });
    if (userAddingDto.companyId) {
      const company = await this.companyRepo.findOne(userAddingDto.companyId);
      if (company) {
        user.company = company;
      } else {
        throw new HttpException('company not found', HttpStatus.NOT_FOUND);
      }
    }
    return this.repo.save(user).then(
      res => toPromise(plainToClass(UserDto, res)),
    );
  }

  async getById(id: number): Promise<UserDto> {
    const entity: UserEntity = await this.repo.findOne(id);
    console.log(entity);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(UserDto, entity);
  }

  async update(id: number, userAddingDto: UserAddingDto): Promise<UserDto> {
    const company = plainToClass(UserEntity, {
      ...await this.repo.findOne(id),
      ...userAddingDto,
    });
    return this.repo.save(company).then(
      res => toPromise(plainToClass(UserDto, res)),
    );
  }

  async deleteById(id: number): Promise<UserDto> {
    const user = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(user),
    );
  }

  getAll() {
    return this.repo.find().then(
      res => toPromise(plainToClass(UserDto, res)),
    );
  }

}
