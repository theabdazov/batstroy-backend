import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';

@Entity('characteristics')
export class CharacteristicEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', { default: '' })
  valueList: string[];

  @ManyToOne(
    type => CategoryEntity, category => category.characteristics, { eager: true },
  )
  category: CategoryEntity;

}
