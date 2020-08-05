import { ApiProperty } from '@nestjs/swagger';

export class OrderProductDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  count: number;
}
