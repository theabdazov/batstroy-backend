import { Module } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCharacteristicEntity } from './product-characteristic.entity';

@Module({
  providers: [ProductCharacteristicService],
  imports: [
    TypeOrmModule.forFeature([ProductCharacteristicEntity]),
  ],
  exports: [ProductCharacteristicService],
})
export class ProductCharacteristicModule {
}
