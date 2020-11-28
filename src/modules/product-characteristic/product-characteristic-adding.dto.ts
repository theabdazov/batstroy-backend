import { ApiProperty } from '@nestjs/swagger';

export class ProductCharacteristicAddingDto {

  @ApiProperty()
  productId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: string;

}
