import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCharacteristicEntity } from './product-characteristic.entity';
import { plainToClass } from 'class-transformer';
import { ProductCharacteristicDto } from './product-characteristic.dto';
import { ProductAddingDto } from '../product/dto/product-adding.dto';
import { ProductCharacteristicAddingDto } from './product-characteristic-adding.dto';

@Injectable()
export class ProductCharacteristicService {
  constructor(
    @InjectRepository(ProductCharacteristicEntity) private repo: Repository<ProductCharacteristicEntity>,
  ) {
  }

  getByProductId(productId: number): Promise<ProductCharacteristicDto[]> {
    return this.repo.find({ productId }).then(
      response => {
        return plainToClass(ProductCharacteristicDto, response);
      },
    );
  }

  deleteByProductId(productId: number): Promise<void> {
    return this.repo.delete({ productId }).then(
      () => null,
    );
  }

  addingMany(productId: number, addingDtoList: ProductCharacteristicAddingDto[]): Promise<ProductCharacteristicDto[]> {
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

}
