import { ApiProperty } from '@nestjs/swagger';

export class CompanyAddingDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
