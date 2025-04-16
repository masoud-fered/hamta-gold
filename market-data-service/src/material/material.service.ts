import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MaterialInterface } from './types/material.interface';
import { firstValueFrom } from 'rxjs';
import { MaterialType } from './enums/material-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaterialService {
  readonly CURRENCY = 'USD';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPrice(materialType: MaterialType): Promise<MaterialInterface> {
    const url = this.configService.get<string>('GOLD_API_URL');

    const response = await firstValueFrom(
      this.httpService.get<MaterialInterface>(
        `${url}${materialType}/${this.CURRENCY}`,
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
