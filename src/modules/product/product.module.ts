import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryModule } from '../category/category.module';
import { FilesModule } from '../files/files.module';
import { ProductCharacteristicModule } from '../product-characteristic/product-characteristic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CategoryModule,
    FilesModule,
    ProductCharacteristicModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, TypeOrmModule],
})
export class ProductModule {
}
