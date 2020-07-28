import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacteristicEntity } from '../../characteristic/entity/characteristic.entity';
import { ProductEntity } from '../../product/entity/product.entity';

@Entity('characteristic-values')
export class CharacteristicValueEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CharacteristicEntity, {eager: true})
  @JoinColumn({ name: 'characteristicId' })
  characteristic: CharacteristicEntity;

  @Column()
  characteristicId: number;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;


  @Column()
  productId: number;

  @Column()
  value: string;

}
