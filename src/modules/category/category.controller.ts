import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryAddingDto } from './dto/category-adding.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryNodeDto } from './dto/category-node.dto';

@ApiTags('categories')
@Controller('api/categories')
export class CategoryController {

  constructor(protected service: CategoryService) {
  }

  @ApiResponse({
    status: 201,
    type: CategoryDto,
  })
  @Post()
  async create(@Body() dto: CategoryAddingDto): Promise<CategoryDto> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  @Get(':id')
  async getById(@Param('id') id: number): Promise<CategoryDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 201,
    type: CategoryDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CategoryAddingDto): Promise<CategoryDto> {
    return this.service.update(id, dto);
  }


  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<CategoryDto> {
    return this.service.deleteById(id);
  }


  @ApiResponse({
    status: 200,
    type: CategoryDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<CategoryDto[]> {
    return this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    type: CategoryNodeDto,
    isArray: true,
  })
  @Get('tree/all')
  getAllTree(): Promise<CategoryNodeDto[]> {
    return this.service.getTrees();
  }

  @ApiResponse({
    status: 200,
    type: CategoryNodeDto,
    isArray: true,
  })
  @Get('tree/:id')
  getChildren(@Param('id') id: number) {
    return this.service.getDescendantsTrees(id);
  }

}
