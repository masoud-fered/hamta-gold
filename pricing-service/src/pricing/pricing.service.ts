import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingService {
  static readonly MAX_CAPACITY = 1000;

  calculatePrice(price: number, quantity: number): number {
    const quantityPercentage = (quantity * 100) / PricingService.MAX_CAPACITY;
    const priceFactor = this.calculatePriceFactor(quantityPercentage);
    return price * priceFactor;
  }

  private calculatePriceFactor(quantityPercentage: number) {
    let priceFactor = 1;
    if (quantityPercentage > 50) {
      if (20 <= quantityPercentage) {
        priceFactor = 1.05;
      } else {
        priceFactor = 1.1;
      }
    }
    return priceFactor;
  }
}
