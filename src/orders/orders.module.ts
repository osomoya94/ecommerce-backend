import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';
import { Order } from './orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/products.repository';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entitys';
import { UsersRepository } from 'src/users/users.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { Category } from 'src/categories/categories.entityes';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User, Category, OrderDetail]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    UsersRepository,
    ProductRepository,
    CategoriesRepository,
  ],
})
export class OrdersModule {}
