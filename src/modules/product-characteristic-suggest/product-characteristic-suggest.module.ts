import { Module } from '@nestjs/common';
import { ProductCharacteristicSuggestController } from './product-characteristic-suggest.controller';
import { ProductCharacteristicSuggestService } from './product-characteristic-suggest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCharacteristicSuggestEntity } from './product-characteristic-suggest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCharacteristicSuggestEntity]),
  ],
  controllers: [ProductCharacteristicSuggestController],
  providers: [ProductCharacteristicSuggestService],
  exports: [ProductCharacteristicSuggestService]
})
export class ProductCharacteristicSuggestModule {}
