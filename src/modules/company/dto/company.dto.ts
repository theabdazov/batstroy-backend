import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
