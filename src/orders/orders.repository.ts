import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entitys';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userRepositoryMetodo: UsersRepository, //ver si puedo hacer esto
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // con esto
  ) {}

  async addOrder(idUser: string, products: { id: string }[]) {
    const userFind = await this.userRepositoryMetodo.getById(idUser);

    if (typeof userFind === 'string') {
      return userFind;
    }

    const productIds: string[] = products.map((product) => product.id);
    const productList = await this.productRepository
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids: productIds })
      .andWhere('product.stock > 0')
      .getMany();

    if (!productList.length) {
      return 'No hay productos disponibles con stock';
    }

    let total = 0;
    for (const product of productList) {
      total += Number(product.price);
      product.stock -= 1;
      await this.productRepository.save(product);
    }

    const orderDetail = this.orderRepository.manager.create(OrderDetail, {
      price: total,
      products: productList,
    });
    await this.orderRepository.manager.save(orderDetail);

    const order: Order = this.orderRepository.create({
      user: userFind,
      total,
      date: new Date(),
      details: orderDetail,
    });

    await this.orderRepository.save(order);

    return {
      message: 'Orden creada con éxito',
      orderId: order.id,
      total: order.total,
    };
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'details', 'details.products'],
    });
    if (!order) {
      return 'Orden no encontrada';
    }

    return {
      id: order.id,
      date: order.date,
      total: order.total,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      details: order.details,
    };
  }
}
