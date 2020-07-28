import { Module } from '@nestjs/common';
import { CharacteristicValueService } from './characteristic-value.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { CharacteristicValueEntity } from './entity/characteristic-value.entity';
import { CharacteristicModule } from '../characteristic/characteristic.module';

@Module({
  providers: [CharacteristicValueService],
  imports: [
    TypeOrmModule.forFeature([CharacteristicValueEntity]),
    CategoryModule,
    CharacteristicModule,
  ],
  exports: [
    CharacteristicValueService
  ]
})
export class CharacteristicValueModule {
}
