import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyAddingDto } from './dto/company-adding.dto';
import { CompanyDto } from './dto/company.dto';

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
  create(@Body() dto: CompanyAddingDto) {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CompanyAddingDto) {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: CompanyDto,
    isArray: true,
  })
  @Get()
  getAll() {
    return this.service.getAll();
  }
}
