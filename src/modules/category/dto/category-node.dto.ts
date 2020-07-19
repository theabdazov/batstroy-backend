import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FileDto } from '../../files/dto/file.dto';

export class CategoryNodeDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  orderNumber: number;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  @Type(() => CategoryNodeDto)
  children: CategoryNodeDto[];
}
