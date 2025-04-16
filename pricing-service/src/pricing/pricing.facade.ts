import { Injectable } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PricingFacade {
  constructor(
    private readonly pricingService: PricingService,
    private readonly storageService: StorageService,
  ) {}
}
