import { CategoryDto } from '../../category/dto/category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CharacteristicValueDto } from '../../characteristic-value/dto/characteristic-value.dto';
import { CompanyDto } from '../../company/dto/company.dto';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  ownerPrice: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ isArray: true })
  photos: string[];

  @ApiProperty()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @ApiProperty()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ApiProperty()
  @Type(() => CharacteristicValueDto)
  characteristicValues: CharacteristicValueDto[];
}
