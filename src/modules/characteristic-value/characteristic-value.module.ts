import { Module } from '@nestjs/common';
import { CharacteristicValueController } from './characteristic-value.controller';
import { CharacteristicValueService } from './characteristic-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { CharacteristicValueEntity } from './entity/characteristic-value.entity';
import { ProductModule } from '../product/product.module';
import { CharacteristicModule } from '../characteristic/characteristic.module';

@Module({
  controllers: [CharacteristicValueController],
  providers: [CharacteristicValueService],
  imports: [
    TypeOrmModule.forFeature([CharacteristicValueEntity]),
    CategoryModule,
    ProductModule,
    CharacteristicModule,
  ],
})
export class CharacteristicValueModule {
}
