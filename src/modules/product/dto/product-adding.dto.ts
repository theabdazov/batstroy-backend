import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCharacteristicAddingDto } from '../../product-characteristic/product-characteristic-adding.dto';

export class ProductAddingDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNumber()
  ownerPrice: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ isArray: true })
  photos: string[];

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  saleTypeId: number;

  @ApiProperty({ isArray: true })
  characteristics: ProductCharacteristicAddingDto[];
}
