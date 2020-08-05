import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { OrderAddingDto } from './dto/order-adding.dto';

@ApiTags('orders')
@Controller('api/order')
export class OrderController {
   constructor(
     private orderService: OrderService
   ){
   }

  @ApiResponse({
    status: 201,
    type: OrderDto,
  })
  @Post()
  create(@Body() dto: OrderAddingDto): Promise<OrderDto> {
    return this.orderService.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: OrderDto,
  })
  @Get(':id')
  getById(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: OrderDto,
    isArray: true,
  })
  @Get()
  getAll(): Promise<OrderDto[]> {
    return this.orderService.getAll();
  }
}
