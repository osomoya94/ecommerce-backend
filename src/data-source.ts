import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';

const NODE_ENV = process.env.NODE_ENV || 'development';
loadEnv({ path: resolve(__dirname, `../.env.${NODE_ENV}`) });
import { Order } from 'src/orders/orders.entity';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
import { Product } from 'src/products/products.entity';
import { Category } from 'src/categories/categories.entityes';
import { User } from 'src/users/users.entitys';

//const migrations = [resolve(__dirname, './migrations/*.{ts,js}')];

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  entities: [Order, OrderDetail, Product, Category, User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: NODE_ENV !== 'production',
  migrationsTableName: 'migrations_history',
});
