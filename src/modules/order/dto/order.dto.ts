import { ApiProperty } from '@nestjs/swagger';
import { OrderProductDto } from './order-product.dto';
import { Type } from 'class-transformer';
import { OrderStatus } from '../order-status.enum';

export class OrderDto {
  @ApiProperty()
  id: number;

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

  @ApiProperty()
  status: OrderStatus;
}
