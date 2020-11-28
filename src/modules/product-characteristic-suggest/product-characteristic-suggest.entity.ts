import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product-characteristic-suggests')
export class ProductCharacteristicSuggestEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
