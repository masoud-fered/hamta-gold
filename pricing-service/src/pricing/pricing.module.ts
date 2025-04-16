import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { PricingFacade } from './pricing.facade';
import { StorageModule } from '../storage/storage.module';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [StorageModule],
  providers: [StorageService, PricingService, PricingFacade],
  controllers: [PricingController],
})
export class PricingModule {}
