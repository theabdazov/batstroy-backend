import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SaleTypeService } from './sale-type.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SaleTypeDto } from './dto/sale-type.dto';
import { SaleTypeAddingDto } from './dto/sale-type-adding.dto';

@ApiTags('sale-types')
@Controller('api/sale-types')
export class SaleTypeController {
  constructor(public service: SaleTypeService) {
  }

  @ApiResponse({
    status: 201,
    type: SaleTypeDto,
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: SaleTypeAddingDto) {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: SaleTypeDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: SaleTypeDto,
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() dto: SaleTypeAddingDto) {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: SaleTypeDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: SaleTypeDto,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.service.getAll();
  }
}
