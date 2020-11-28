import { ApiProperty } from '@nestjs/swagger';

export class ProductCharacteristicSuggestDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

}
