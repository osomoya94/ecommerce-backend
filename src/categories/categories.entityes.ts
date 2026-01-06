import { Product } from 'src/products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, length: 50, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
