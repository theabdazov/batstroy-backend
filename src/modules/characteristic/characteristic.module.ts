import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicEntity } from './entity/characteristic.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacteristicEntity]),
    CategoryModule,
  ],
  controllers: [CharacteristicController],
  providers: [CharacteristicService],
  exports: [CharacteristicService, TypeOrmModule],
})
export class CharacteristicModule {
}
