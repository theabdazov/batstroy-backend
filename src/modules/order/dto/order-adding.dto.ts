import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';
import { OrderStatus } from '../order-status.enum';

export class OrderAddingDto {

  @ApiProperty()
  customerFullName: string;

  @ApiProperty()
  customerPhoneNumber: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
