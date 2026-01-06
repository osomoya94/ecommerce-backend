import { Category } from 'src/categories/categories.entityes';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 10, nullable: false })
  stock: number;

  @Column({ default: 'https://via.placeholder.com/150', length: 255 })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinColumn({ name: 'category_id' })
  orderDetails: OrderDetail[];
}
