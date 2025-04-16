import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  material: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
