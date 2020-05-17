import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CategoryNodeDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  @Type(() => CategoryNodeDto)
  children: CategoryNodeDto[];
}
