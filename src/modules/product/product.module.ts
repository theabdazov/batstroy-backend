import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryModule } from '../category/category.module';
import { FilesModule } from '../files/files.module';
import { ProductPhotoEntity } from './entity/product-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductPhotoEntity]),
    CategoryModule,
    FilesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
}
