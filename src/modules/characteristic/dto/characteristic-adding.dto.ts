import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CharacteristicAddingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  valueList: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiProperty({ required: false })
  @IsNumber()
  orderNumber: number;
}
