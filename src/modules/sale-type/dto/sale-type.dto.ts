import { ApiProperty } from '@nestjs/swagger';

export class SaleTypeDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;
}
