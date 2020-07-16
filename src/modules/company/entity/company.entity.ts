import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class CompanyEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;
}
