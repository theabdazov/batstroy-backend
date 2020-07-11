import { Module } from '@nestjs/common';
import { CharacteristicValueController } from './characteristic-value.controller';
import { CharacteristicValueService } from './characteristic-value.service';

@Module({
  controllers: [CharacteristicValueController],
  providers: [CharacteristicValueService]
})
export class CharacteristicValueModule {}
