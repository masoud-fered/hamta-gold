import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialType } from './enums/matrial-type.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly reservationRepository: Repository<Reservation>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    email: string,
    type: MaterialType,
    amount: number,
    calculatedPrice: number,
    materialPrice: number,
  ) {
    this.dataSource.transaction(async (manager) => {
      const reservation = manager.create(Reservation, {
        email, type, amount, caculatedPrice,
        
      });
    });
  }
};