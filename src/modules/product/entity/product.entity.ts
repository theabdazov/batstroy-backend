import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';
import { ProductPhotoEntity } from './product-photo.entity';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @ManyToOne(
    () => CategoryEntity,
    category => category.products,
    { eager: true, cascade: ['insert'] },
  )
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(
    () => ProductPhotoEntity,
    photo => photo.product,
    { eager: true },
  )
  photos: ProductPhotoEntity[];
}
