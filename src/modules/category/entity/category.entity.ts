import {
  Column,
  Entity, JoinColumn,
  ManyToMany, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CharacteristicEntity } from '../../characteristic/entity/characteristic.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { FilesEntity } from '../../files/entity/files.entity';

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

  @OneToMany(type => CharacteristicEntity, characteristic => characteristic.category)
  characteristics: CharacteristicEntity[];

  @OneToMany(type => ProductEntity, product => product.category)
  products: ProductEntity[];

}
