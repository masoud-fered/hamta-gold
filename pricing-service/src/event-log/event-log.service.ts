import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventLog } from './entities/event-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLogInterface } from './types/event-log.interface';
import { MaterialType } from '../storage/enums/material-type.enum';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly eventLogRepository: Repository<EventLog>,
  ) {}

  async create(event: EventLogInterface) {
    const eventLog = this.eventLogRepository.create(event);
    await this.eventLogRepository.save(eventLog);
  }

}
