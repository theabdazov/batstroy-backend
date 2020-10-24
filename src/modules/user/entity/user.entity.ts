import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CompanyEntity } from '../../company/entity/company.entity';

@Entity('users')

export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @ManyToOne(() => CompanyEntity, { eager: true })
  company: CompanyEntity;

}
