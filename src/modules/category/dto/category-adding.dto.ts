import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryAddingDto {
  @ApiProperty({ required: false})
  parentId?: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false})
  imageUrl?: string;
}
