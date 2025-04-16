import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class EventLog {
  @PrimaryGeneratedColumn()
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
