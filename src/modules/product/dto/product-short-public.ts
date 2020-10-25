import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { SaleTypeDto } from '../../sale-type/dto/sale-type.dto';

@Exclude()
export class ProductShortPublic {

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
  @ApiProperty({ isArray: true })
  photos: string[];

  @Expose()
  @ApiProperty()
  @Type(() => SaleTypeDto)
  saleType: SaleTypeDto;
}
