import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SaleTypeDto } from '../../sale-type/dto/sale-type.dto';
import { ProductCharacteristicDto } from '../../product-characteristic/product-characteristic.dto';

@Exclude()
export class ProductDetailPublic {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  desc: string;

  @Expose()
  @ApiProperty({ isArray: true })
  photos: string[];

  @Expose()
  @ApiProperty()
  @Type(() => SaleTypeDto)
  saleType: SaleTypeDto;

  @Expose()
  @ApiProperty({ isArray: true })
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];
}
