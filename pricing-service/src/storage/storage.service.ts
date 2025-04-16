import { Injectable } from '@nestjs/common';
import { MaterialType } from './enums/material-type.enum';
import { EventLogService } from '../event-log/event-log.service';
import { EventLogInterface } from '../event-log/types/event-log.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly eventLogService: EventLogService,
  ) {}

  async create(event: EventLogInterface) {
    await this.eventLogService.create(event);
  }

  async getQuantity(material: MaterialType) {
    const { quantity } = await this.eventLogService.getLastEvent(material);
    return quantity;
  }

  async updateQuantity(material: MaterialType) {}
}
