import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'orders_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @OneToOne(() => Order, (order) => order.details)
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details_products',
  })
  products: Product[];
}
