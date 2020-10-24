import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserAddingDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ required: false })
  password: string;

  @ApiProperty({ required: false })
  companyId: number;
}
