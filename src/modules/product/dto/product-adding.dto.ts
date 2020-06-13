import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductAddingDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({type: [Number]})
  @IsArray()
  photoIds: number[];

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}
