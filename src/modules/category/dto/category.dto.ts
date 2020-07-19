import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  parent: CategoryDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  orderNumber: number;

  @ApiProperty()
  imageUrl: string;
}
