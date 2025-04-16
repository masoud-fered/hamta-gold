import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MaterialService } from '../material/material.service';
import { MaterialType } from '../material/enums/material-type.enum';

@Injectable()
export class SchedulerService {
  constructor(private readonly materialService: MaterialService) {}

  @Cron('30 * * * * *')
  async handleCron() {
    console.log('Cron ran successfully');
    const goldPrice = await this.materialService.getPrice(MaterialType.GOLD);
    console.log('------->>>>>', goldPrice);
  }
}
