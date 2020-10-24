import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Like, Repository } from 'typeorm';
import { toPromise } from '../../util/toPromise';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entity/user.entity';
import { UserAddingDto } from './dto/user-adding.dto';
import { UserDto } from './dto/user.dto';
import { CompanyEntity } from '../company/entity/company.entity';
import { UserFilter } from './dto/user-filter';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { comparePasswords } from '../../util/compare-password';
import { passwordToHash } from '../../util/password-to-hash';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    @InjectRepository(CompanyEntity) private companyRepo: Repository<CompanyEntity>,
  ) {
  }

  async create(userAddingDto: UserAddingDto): Promise<UserDto> {
    const { password, companyId, ...data } = userAddingDto;
    const user = plainToClass(UserEntity, {
      ...this.repo.create(),
      ...data,
      company: companyId ? { id: companyId } : null,
      password: await passwordToHash(password),
    });

    return this.repo.save(user).then(
      res => toPromise(plainToClass(UserDto, res)),
    );
  }

  async getById(id: number): Promise<UserDto> {
    const entity: UserEntity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(UserDto, entity);
  }

  async getByPhoneNumber({ phoneNumber, password }: UserCredentialsDto): Promise<UserDto> {
    const user = await this.repo.findOne({ where: { phoneNumber } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return plainToClass(UserDto, user);
  }

  async findByPayload({ phoneNumber }: Partial<UserCredentialsDto>): Promise<UserDto> {
    const user = await this.repo.findOne({ where: { phoneNumber } });
    return plainToClass(UserDto, user);
  }

  async update(id: number, userAddingDto: UserAddingDto): Promise<UserDto> {
    const { password, companyId, ...data } = userAddingDto;
    const userEntity = plainToClass(UserEntity, {
      ...await this.repo.findOne(id),
      ...data,
      company: companyId ? { id: companyId } : null,
    });
    if (password) {
      userEntity.password = await passwordToHash(password);
    }
    return this.repo.save(userEntity).then(
      res => plainToClass(UserDto, res),
    );
  }

  async deleteById(id: number): Promise<UserDto> {
    const user = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(user),
    );
  }

  getAll(userFilter: UserFilter) {
    const filter: FindConditions<UserEntity> = {};
    if (userFilter) {
      if (userFilter.fullName) {
        filter.fullName = Like(`%${userFilter.fullName}%`);
      }
      if (userFilter.phoneNumber) {
        filter.phoneNumber = Like(`%${userFilter.phoneNumber}%`);
      }
    }
    return this.repo.find(filter).then(
      res => toPromise(plainToClass(UserDto, res)),
    );
  }

}
