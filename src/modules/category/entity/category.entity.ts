import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ProductEntity } from '../../product/entity/product.entity';

@Entity('categories')
@Tree("materialized-path")
export class CategoryEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  orderNumber: string;

  @Column({nullable: true})
  imageUrl: string;

  @TreeChildren()
  children: CategoryEntity[];

  @TreeParent()
  parent: CategoryEntity;

  @OneToMany(type => ProductEntity, product => product.category)
  products: ProductEntity[];

}
