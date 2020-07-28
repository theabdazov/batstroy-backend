import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductAddingDto } from './dto/product-adding.dto';
import { ProductDto } from './dto/product.dto';
import { PaginationPageDto } from '../dto/pagination-page.dto';
import { ProductFilter } from './dto/product-filter';
import { ProductFilterPublic } from './dto/product-filter-public';
import { ProductShortPublic } from './dto/product-short-public';

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
    type: PaginationPageDto,
  })
  @Post('list')
  getProductList(@Body() filter: ProductFilter): Promise<PaginationPageDto<ProductDto>> {
    return this.service.getProductList(filter);
  }

  @ApiResponse({
    status: 200,
    type: PaginationPageDto,
  })
  @Post('list-public')
  getProductListPublic(@Body() filter: ProductFilterPublic): Promise<PaginationPageDto<ProductShortPublic>> {
    return this.service.getProductListPublic(filter);
  }

  @ApiResponse({
    status: 200,
    type: ProductShortPublic,
  })
  @Get(':id/public')
  getByIdPublic(@Param('id') id: number): Promise<ProductShortPublic> {
    return this.service.getByIdPublic(id);
  }

}
