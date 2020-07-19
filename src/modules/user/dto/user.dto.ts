import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from '../../company/dto/company.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty({ required: false })
  company: CompanyDto;
}
