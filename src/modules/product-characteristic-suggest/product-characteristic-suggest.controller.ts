import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCharacteristicSuggestService } from './product-characteristic-suggest.service';
import { ProductCharacteristicSuggestDto } from './product-characteristic-suggest.dto';
import { ProductCharacteristicSuggestAddingDto } from './product-characteristic-suggest-adding.dto';

@ApiTags('product-characteristic-suggests')
@Controller('api/product-characteristic-suggests')
export class ProductCharacteristicSuggestController {

  constructor(
    private service: ProductCharacteristicSuggestService,
  ) {
  }

  @ApiResponse({
    status: 201,
    type: ProductCharacteristicSuggestDto,
  })
  @Post()
  create(@Body() adding: ProductCharacteristicSuggestAddingDto): Promise<ProductCharacteristicSuggestDto> {
    return this.service.create(adding);
  }

  @ApiResponse({
    status: 200,
    type: ProductCharacteristicSuggestDto,
  })
  @Get(':id')
  getById(@Param('id') id: number): Promise<ProductCharacteristicSuggestDto> {
    return this.service.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: ProductCharacteristicSuggestDto,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body()  adding: ProductCharacteristicSuggestAddingDto): Promise<ProductCharacteristicSuggestDto> {
    return this.service.update(id, adding);
  }

  @ApiResponse({
    status: 200,
    type: ProductCharacteristicSuggestDto,
  })
  @Delete(':id')
  deleteById(@Param('id') id: number): Promise<ProductCharacteristicSuggestDto> {
    return this.service.deleteById(id);
  }

  @ApiResponse({
    status: 200,
    type: ProductCharacteristicSuggestDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<ProductCharacteristicSuggestDto[]> {
    return this.service.getAll();
  }

  @ApiResponse({
    status: 200,
    type: ProductCharacteristicSuggestDto,
    isArray: true,
  })
  @Get('suggests/:text')
  suggests(@Param('text') text: string): Promise<ProductCharacteristicSuggestDto[]> {
    return this.service.suggests(text);
  }

}
