import { FileDto } from '../../files/dto/file.dto';
import { CategoryDto } from '../../category/dto/category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entity/product.entity';
import { plainToClass } from 'class-transformer';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [FileDto] })
  photos: FileDto[];

  @ApiProperty()
  category: CategoryDto;

  static from(product: ProductEntity): ProductDto {
    return {
      ...product,
      photos: plainToClass(FileDto, product.photos && product.photos.map(item => item.photo)),
      category: plainToClass(CategoryDto, product.category),
    };
  }
}
