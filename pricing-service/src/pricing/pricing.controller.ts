import { Controller } from '@nestjs/common';
import { PricingFacade } from './pricing.facade';
import { EventLogInterface } from './types/event-log.interface';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PricingService } from './pricing.service';
import { StorageService } from '../storage/storage.service';

@Controller()
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly storageService: StorageService,
    private readonly pricingFacade: PricingFacade,
  ) {}

  @EventPattern('material-price-update')
  async onPriceUpdated(
    @Payload() event: EventLogInterface,
    @Ctx() context: RmqContext,
  ) {
    const quantity = await this.storageService.getQuantity(event.material);
    const result = this.pricingService.calculatePrice(event.price, quantity);
    console.log(event);
    console.log(context);
  }
}
