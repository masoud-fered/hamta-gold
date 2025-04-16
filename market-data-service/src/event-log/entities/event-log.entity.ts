import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  material: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  currency: string;

  @CreateDateColumn()
  createdAt: Date;
}
