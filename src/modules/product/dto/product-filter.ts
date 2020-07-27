import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../dto/pagination.dto';

export class ProductFilter extends PaginationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryIds: number[];
}
