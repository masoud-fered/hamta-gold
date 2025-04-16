import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MaterialModule } from '../material/material.module';
import { EventLogModule } from '../event-log/event-log.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@127.0.0.1:5672'],
          queue: 'materialPriceQueue',
        },
      },
    ]),
    MaterialModule,
    EventLogModule,
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
