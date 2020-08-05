import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../order-status.enum';
import { OrderProductEntity } from './order-product.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerFullName: string;

  @Column()
  customerPhoneNumber: string;

  @Column({nullable: true})
  comment: string;

  @Column()
  address: string;

  @OneToMany(() => OrderProductEntity, entity => entity.order, {eager: true, cascade: ['insert', 'update']})
  products: OrderProductEntity[];

  @Column('text')
  status: OrderStatus;

}
