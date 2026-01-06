import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
import { User } from 'src/users/users.entitys';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  // @Column({ nullable: false })
  // userId: string; comente esta linea pq sino me da error de clave foranea

  @Column()
  date: Date;

  @Column({ type: 'float', default: 0 })
  total: number;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'order_detail_id' })
  details: OrderDetail;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
