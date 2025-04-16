import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule,
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
  ],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
