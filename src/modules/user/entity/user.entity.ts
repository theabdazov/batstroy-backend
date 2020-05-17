import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from '../../company/entity/company.entity';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @ManyToOne(type => CompanyEntity, company => company.employees, { eager: true })
  company: CompanyEntity;

}
