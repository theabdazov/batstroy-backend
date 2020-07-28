import { CharacteristicDto } from '../../characteristic/dto/characteristic.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CharacteristicValueDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  value: string;

  @ApiProperty()
  characteristic: CharacteristicDto;
}
