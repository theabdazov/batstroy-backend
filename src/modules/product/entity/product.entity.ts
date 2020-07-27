import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  ownerPrice: number;

  @Column()
  price: number;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => CategoryEntity, category => category.products, {eager: true})
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column()
  categoryId: number;

  @Column('simple-array')
  photos: string[];
}
