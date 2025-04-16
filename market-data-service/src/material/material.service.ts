import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MaterialInterface } from './types/material.interface';
import { firstValueFrom } from 'rxjs';
import { MaterialType } from './enums/material-type.enum';
import { ConfigService } from '@nestjs/config';
import { Currency } from './enums/currencies.enum';

@Injectable()
export class MaterialService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPrice(
    materialType: MaterialType,
    currency: Currency,
  ): Promise<MaterialInterface> {
    const url = this.configService.get<string>('GOLD_API_URL');

    const response = await firstValueFrom(
      this.httpService.get<MaterialInterface>(
        `${url}${materialType}/${currency}`,
        {
          headers: {
            'x-access-token': this.configService.get<string>('GOLD_API_KEY'),
          },
        },
      ),
    );
    return response.data;
  }
}
