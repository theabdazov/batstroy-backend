import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { CharacteristicEntity } from '../../characteristic/entity/characteristic.entity';
import { ProductEntity } from '../../product/entity/product.entity';

@Entity('categories')
@Tree('materialized-path')
export class CategoryEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
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
