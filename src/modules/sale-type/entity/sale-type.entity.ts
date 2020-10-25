import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale-types')
export class SaleTypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;
}
