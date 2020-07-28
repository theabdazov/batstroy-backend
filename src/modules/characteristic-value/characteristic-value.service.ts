import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacteristicValueEntity } from './entity/characteristic-value.entity';
import { CharacteristicValueAddingDto } from './dto/characteristic-value-adding.dto';
import { CharacteristicValueDto } from './dto/characteristic-value.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CharacteristicValueService {
  constructor(
    @InjectRepository(CharacteristicValueEntity) private repo: Repository<CharacteristicValueEntity>,
  ) {
  }

  getByProductId(productId: number): Promise<CharacteristicValueDto[]> {
    return this.repo.find({ productId }).then(
      response => {
        return plainToClass(CharacteristicValueDto, response);
      },
    );
  }

  deleteByProductId(productId: number): Promise<void> {
    return this.repo.delete({ productId }).then(
      () => null,
    );
  }

  addingMany(productId: number, addingDtoList: CharacteristicValueAddingDto[]): Promise<CharacteristicValueDto[]> {
    return this.repo.insert(
      addingDtoList.map(item => {
        return {
          ...item,
          productId,
        };
      }),
    ).then(
      () => this.getByProductId(productId),
    );
  }

  async updateMany(productId: number, addingDtoList: CharacteristicValueAddingDto[]): Promise<CharacteristicValueDto[]> {
    await this.deleteByProductId(productId);
    return this.addingMany(productId, addingDtoList);
  }
}
