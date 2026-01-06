import { Order } from 'src/orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, unique: true, length: 50, type: 'varchar' })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ length: 50, type: 'varchar' })
  country: string;

  @Column({ length: 50, type: 'varchar' })
  city: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ nullable: false })
  confirmPassword: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
