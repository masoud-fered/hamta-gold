import { Injectable } from '@nestjs/common';
import { EventLogService } from '../event-log/event-log.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { MaterialTitle } from './enums/material-title.enum';
import { MaterialInterface } from './types/material.interface';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly eventLogService: EventLogService,
  ) {}

  async create(material: MaterialInterface) {
    const materialEntity = this.materialRepository.create(material);
    await Promise.all([
      this.eventLogService.create({
        material: material.title,
        quantity: material.quantity,
      }),
      this.materialRepository.save(materialEntity),
    ]);
  }

  async getQuantity(materialTitle: MaterialTitle) {
    const { quantity } = await this.materialRepository.findOne({
      where: {
        title: materialTitle,
      },
    });
    return quantity;
  }

  async increaseQuantity(title: string, amount: number) {
    await this.materialRepository.increment({ title }, 'quantity', amount);
  }

  async decreaseQuantity(title: string, amount: number) {
    await this.materialRepository.decrement({ title }, 'quantity', amount);
  }
}
