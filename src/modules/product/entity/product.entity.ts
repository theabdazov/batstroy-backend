import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../../category/entity/category.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { SaleTypeEntity } from '../../sale-type/entity/sale-type.entity';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  ownerPrice: number;

  @Column()
  price: number;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => CategoryEntity, category => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @Column()
  categoryId: number;

  @ManyToOne(() => CompanyEntity, { eager: false, nullable: true })
  company: CompanyEntity;

  @ManyToOne(() => SaleTypeEntity, { eager: true })
  saleType: SaleTypeEntity;

  @Column('simple-array')
  photos: string[];
}
