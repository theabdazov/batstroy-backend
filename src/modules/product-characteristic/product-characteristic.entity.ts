import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/entity/product.entity';

@Entity('product-characteristics')
export class ProductCharacteristicEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { eager: false })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  productId: number;

  @Column()
  title: string;

  @Column()
  value: string;
}
