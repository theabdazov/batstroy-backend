import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesEntity } from './entity/files.entity';
import { plainToClass } from 'class-transformer';
import { toPromise } from '../../util/toPromise';
import { FileAddingDto } from './dto/file-adding-dto';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesEntity)
    private repo: Repository<FilesEntity>) {
  }

  create(addingDto: FileAddingDto): Promise<FileDto> {
    const file: FilesEntity = plainToClass(FilesEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    return this.repo.save(file).then(
      res => toPromise(plainToClass(FileDto, res)),
    );
  }

  async createOfMany(array: FileAddingDto[]): Promise<FileDto[]> {
    const resArray: Promise<FileDto>[] = [];
    array.forEach(addingDto => {
      resArray.push(this.create(addingDto));
    });
    return Promise.all(resArray);
  }

  async getById(id: number): Promise<FileDto> {
    const entity = await this.repo.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(FileDto, entity);
  }

  async deleteById(id: number): Promise<FileDto> {
    const file = await this.getById(id);
    return this.repo.delete(id).then(
      () => toPromise(file),
    );
  }

  async getAll(): Promise<FileDto[]> {
    const entity = await this.repo.find();
    return plainToClass(FileDto, entity);
  }
}
