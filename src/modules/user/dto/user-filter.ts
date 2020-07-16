import { ApiProperty } from '@nestjs/swagger';

export class UserFilter {

  @ApiProperty({required:false})
  fullName: string;

  @ApiProperty({required:false})
  phoneNumber: string;
}
