import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharacteristicService } from './characteristic.service';
import { CharacteristicDto } from './dto/characteristic.dto';
import { CharacteristicAddingDto } from './dto/characteristic-adding.dto';

@ApiTags('characteristics')
@Controller('api/characteristics')
export class CharacteristicController {

  constructor(
    private service: CharacteristicService,
  ) {
  }

  @ApiResponse({
    status: 201,
    type: CharacteristicDto,
  })
  @Post()
  create(@Body() dto: CharacteristicAddingDto): Promise<CharacteristicDto> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: CharacteristicDto,
  })
  @Get(':id')
  getById(@Param('id') id: number): Promise<CharacteristicDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: CharacteristicDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CharacteristicAddingDto): Promise<CharacteristicDto> {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CharacteristicDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<CharacteristicDto> {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: CharacteristicDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<CharacteristicDto[]> {
    return this.service.getAll();
  }

}
