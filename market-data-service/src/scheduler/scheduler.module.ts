import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MaterialModule } from '../material/material.module';

@Module({
  imports: [ScheduleModule.forRoot(), MaterialModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
