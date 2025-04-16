import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MaterialService } from '../material/material.service';
import { MaterialType } from '../material/enums/material-type.enum';
import { EventLogService } from '../event-log/event-log.service';
import { Currency } from '../material/enums/currencies.enum';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SchedulerService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly rabbitMqService: ClientProxy,
    private readonly materialService: MaterialService,
    private readonly eventLogService: EventLogService,
  ) {}

  @Cron('15 * * * * *')
  async handleCron() {
    const { price } = await this.materialService.getPrice(
      MaterialType.GOLD,
      Currency.USD,
    );
    const event = {
      material: MaterialType.GOLD,
      price: price,
      currency: Currency.USD,
    };
    await this.eventLogService.create(event);
    this.rabbitMqService.emit('material-price-update', event);
  }
}
