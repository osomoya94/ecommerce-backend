import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  addOrder(idUser: string, products: { id: string }[]) {
    return this.orderRepository.addOrder(idUser, products);
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder(id);
  }
}
