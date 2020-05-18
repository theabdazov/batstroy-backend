import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalFilename: string;

  @Column()
  path: string;
}
