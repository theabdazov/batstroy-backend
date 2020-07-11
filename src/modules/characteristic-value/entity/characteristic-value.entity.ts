import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacteristicEntity } from '../../characteristic/entity/characteristic.entity';
import { ProductEntity } from '../../product/entity/product.entity';

@Entity('characteristic-values')
export class CharacteristicValueEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CharacteristicEntity)
  characteristic: CharacteristicEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column()
  value: string;

}
