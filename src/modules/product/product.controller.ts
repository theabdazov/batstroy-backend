import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductAddingDto } from './dto/product-adding.dto';
import { ProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductController {

  constructor(public service: ProductService) {
  }

  @ApiResponse({
    status: 201,
    type: ProductDto,
  })
  @Post()
  create(@Body() dto: ProductAddingDto): Promise<ProductDto> {
    return this.service.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @Get(':id')
  getById(@Param('id') id: number): Promise<ProductDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: ProductAddingDto): Promise<ProductDto> {
    return this.service.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<ProductDto> {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: ProductDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<ProductDto[]> {
    return this.service.getAll();
  }
}
