import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CharacteristicValueAddingDto } from '../../characteristic-value/dto/characteristic-value-adding.dto';

export class ProductAddingDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNumber()
  ownerPrice: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ isArray: true })
  photos: string[];

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  characteristicValues: CharacteristicValueAddingDto[];
}
