import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './Dto/createOrders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDTO) {
    const { idUser, products } = order;
    return this.orderService.addOrder(idUser, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(id: string) {
    return this.orderService.getOrder(id);
  }
}
