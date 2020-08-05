import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderProductEntity } from './entity/order-product.entity';
import { plainToClass } from 'class-transformer';
import { OrderDto } from './dto/order.dto';
import { toPromise } from '../../util/toPromise';
import { OrderAddingDto } from './dto/order-adding.dto';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderEntityRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity) private orderProductEntityRepository: Repository<OrderProductEntity>,
  ) {
  }

  async getById(id: number): Promise<OrderDto> {
    const entity: OrderEntity = await this.orderEntityRepository.findOne(id);
    if (!entity) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return plainToClass(OrderDto, entity);
  }

  async create(orderAddingDto: OrderAddingDto): Promise<OrderDto> {
    const entity = plainToClass(OrderEntity, {
      ...this.orderEntityRepository.create(),
      ...orderAddingDto,
      status: OrderStatus.Pending
    });
    return this.orderEntityRepository.save(entity).then(
      res => toPromise(plainToClass(OrderDto, res)),
    );
  }

  getAll() {
    return this.orderEntityRepository.find().then(
      res => toPromise(plainToClass(OrderDto, res)),
    );
  }

  async deleteById(id: number): Promise<OrderDto> {
    const orderDto = await this.getById(id);
    return this.orderEntityRepository.delete(id).then(
      () => toPromise(orderDto),
    );
  }

  changeStatus(productId: number, newStatus: OrderStatus): Promise<OrderDto> {
    return this.orderEntityRepository.save({
      id: productId,
      status: newStatus
    }).then(
      res => toPromise(plainToClass(OrderDto, res)),
    );
  }
}
