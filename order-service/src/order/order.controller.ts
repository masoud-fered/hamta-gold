import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderFacade } from './order.facade';
import { NewOrderDto } from './dtos/new-order.dto';

@Controller('v1/orders')
export class OrderController {
  constructor(private readonly orderFacade: OrderFacade) {}

  @Post()
  create(@Body() newOrder: NewOrderDto): Promise<any> {
    return this.orderFacade.create(
      newOrder.email,
      newOrder.type,
      newOrder.amount,
    );
  }

  @Get(':id')
  get(@Param('id') id: string) {}

  @Put(':id')
  cancel(@Param('id') id: string) {}

  @Put(':id')
  confirm(@Param('id') id: string) {}

  
}
