import { Module } from '@nestjs/common';
import { SaleTypeController } from './sale-type.controller';
import { SaleTypeService } from './sale-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleTypeEntity } from './entity/sale-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleTypeEntity]),
  ],
  controllers: [SaleTypeController],
  providers: [SaleTypeService],
  exports: [SaleTypeService, TypeOrmModule],
})
export class SaleTypeModule {}
