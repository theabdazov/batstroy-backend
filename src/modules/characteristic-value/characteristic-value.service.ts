import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CharacteristicValueEntity } from './entity/characteristic-value.entity';
import { CharacteristicValueAddingDto } from './dto/characteristic-value-adding.dto';
import { CharacteristicValueDto } from './dto/characteristic-value.dto';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from '../product/entity/product.entity';
import { CharacteristicEntity } from '../characteristic/entity/characteristic.entity';

@Injectable()
export class CharacteristicValueService {
  constructor(
    @InjectRepository(CharacteristicValueEntity) private repo: Repository<CharacteristicValueEntity>,
    @InjectRepository(ProductEntity) private repoProduct: Repository<ProductEntity>,
    @InjectRepository(CharacteristicEntity) private repoCharacteristic: Repository<CharacteristicEntity>,
  ) {
  }

  create(addingDto: CharacteristicValueAddingDto): Promise<CharacteristicValueDto> {
    const entity: DeepPartial<CharacteristicValueEntity> = plainToClass(CharacteristicValueEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    if (addingDto.characteristicId) {
      entity.characteristic = { id: addingDto.characteristicId };
    }
    if (addingDto.productId) {
      entity.product = { id: addingDto.productId };
    }
    return null ;
  }
}
