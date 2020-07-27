import { ApiProperty } from '@nestjs/swagger';

export class PaginationPageDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  totalCount: number;
}
