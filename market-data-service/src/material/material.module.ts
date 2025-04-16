import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
