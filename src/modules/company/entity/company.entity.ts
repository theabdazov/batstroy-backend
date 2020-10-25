import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class CompanyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
