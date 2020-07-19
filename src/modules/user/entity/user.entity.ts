import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CompanyEntity } from '../../company/entity/company.entity';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}
