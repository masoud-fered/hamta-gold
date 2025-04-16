import { OrderService } from './order.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePattern } from './constants/message-pattern.constant';
import { lastValueFrom } from 'rxjs';
import { MaterialType } from './enums/matrial-type.enum';

export class OrderFacade {
  constructor(
    @Inject('PRICING_SERVICE')
    private readonly pricingClient: ClientProxy,
    @Inject('PRICING_SERVICE')
    private readonly storageClient: ClientProxy,
    @Inject('PRICING_SERVICE')
    private readonly orderClient: ClientProxy,
    private readonly orderService: OrderService,
  ) {}

  async create(email: string, type: MaterialType, amount: number): Promise<any> {
    const materialPrice = await lastValueFrom(
      this.pricingClient.send(MessagePattern.GET_LAST_PRICE, {
        material: MaterialType.GOLD,
      }),
    );
    const isExists = await lastValueFrom(
      this.pricingClient.send(MessagePattern.HAS_MATERIAL_IN_INVENTORY, {
        material: MaterialType.GOLD,
        amount,
      }),
    );

    if (!isExists) {
      throw new NotFoundException('Material not found in inventory');
    }

    const calculatedPrice = materialPrice.price * amount;

    return this.orderService.create(
      email,
      type,
      amount,
      calculatedPrice,
      materialPrice,
    );
  }

  get() {}

  cancel() {}
}
