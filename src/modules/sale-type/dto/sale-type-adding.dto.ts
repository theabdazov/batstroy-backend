import { ApiProperty } from '@nestjs/swagger';

export class SaleTypeAddingDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;
}
