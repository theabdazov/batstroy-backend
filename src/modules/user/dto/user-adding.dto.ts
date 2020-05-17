import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserAddingDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ required: false })
  companyId: number;
}
