import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { PricingModule } from './pricing/pricing.module';
import { EventLogModule } from './event-log/event-log.module';

@Module({
  imports: [StorageModule, PricingModule, EventLogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
