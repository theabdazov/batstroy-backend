import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../dto/pagination.dto';

export class ProductFilter extends PaginationDto {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  categoryIds: number[];

  @ApiProperty({ required: false })
  companyIds: number[];
}
