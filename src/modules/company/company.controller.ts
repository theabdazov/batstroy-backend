import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyAddingDto } from './dto/company-adding.dto';
import { CompanyDto } from './dto/company.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('companies')
@Controller('api/companies')
export class CompanyController {
  constructor(public service: CompanyService) {
  }

  @ApiResponse({
    status: 201,
    type: CompanyDto,
  })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CompanyAddingDto) {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() dto: CompanyAddingDto) {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.service.getAll();
  }
}
