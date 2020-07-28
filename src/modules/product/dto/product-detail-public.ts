import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CharacteristicValueDto } from '../../characteristic-value/dto/characteristic-value.dto';

@Exclude()
export class ProductDetailPublic {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty({ isArray: true })
  photos: string[];

  @Expose()
  @ApiProperty()
  @Type(() => CharacteristicValueDto)
  characteristicValues: CharacteristicValueDto[];
}
