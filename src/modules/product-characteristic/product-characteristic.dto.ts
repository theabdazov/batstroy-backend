import { ApiProperty } from '@nestjs/swagger';

export class ProductCharacteristicDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: string;

}
