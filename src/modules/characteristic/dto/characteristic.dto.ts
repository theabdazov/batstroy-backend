import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from '../../category/dto/category.dto';

export class CharacteristicDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  valueList: string[];


  @ApiProperty()
  orderNumber: number;

  @ApiProperty()
  category: CategoryDto;
}
