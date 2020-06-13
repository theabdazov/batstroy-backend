import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilesEntity } from '../../files/entity/files.entity';
import { ProductEntity } from './product.entity';

@Entity('product-photos')
export class ProductPhotoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, product => product.photos)
  product: ProductEntity;

  @ManyToOne(
    () => FilesEntity,
    { eager: true, cascade: ['insert'] },
  )
  @JoinColumn()
  photo: FilesEntity;
}
