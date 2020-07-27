import { FileDto } from '../../files/dto/file.dto';
import { CategoryDto } from '../../category/dto/category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../entity/product.entity';
import { plainToClass, Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  ownerPrice: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ isArray: true })
  photos: string[];

  @ApiProperty()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
