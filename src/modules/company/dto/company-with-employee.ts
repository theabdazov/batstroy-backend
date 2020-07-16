import { CompanyDto } from './company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class CompanyWithEmployee extends CompanyDto {
  @ApiProperty()
  employees: UserDto[];
}
