import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from '../../company/dto/company.dto';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phoneNumber: number;

  @ApiProperty({ required: false })
  company: CompanyDto;
}
