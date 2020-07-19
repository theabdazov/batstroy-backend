import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  password: string;

}
