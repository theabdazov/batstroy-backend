import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from '../../company/entity/company.entity';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => CompanyEntity, { eager: true })
  company: CompanyEntity;

}
