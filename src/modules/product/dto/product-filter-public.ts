import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../dto/pagination.dto';

export class ProductFilterPublic extends PaginationDto {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  name: string;
}
