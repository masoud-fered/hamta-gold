import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventLog } from './event-log.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly EventLogRepository: Repository<EventLog>,
  ) {}

  async create(event: {}) {
    await this.EventLogRepository.create(event);
  }
}
