import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PricingFacade } from './pricing.facade';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule, StorageModule],
  providers: [PricingService, PricingFacade],
  controllers: [PricingController],
})
export class PricingModule {}
