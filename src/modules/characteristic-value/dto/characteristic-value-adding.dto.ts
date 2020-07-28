import { ApiProperty } from '@nestjs/swagger';

export class CharacteristicValueAddingDto {

  @ApiProperty()
  value: string;

  @ApiProperty()
  characteristicId: number;

}
