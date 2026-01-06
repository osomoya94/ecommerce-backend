import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entitys';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { OrderDetail } from './orderDetails/orderDetails.entyties';
import { Category } from './categories/categories.entityes';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Product, Order, OrderDetail, Category],
        migrations: ['dist/migrations/*{.ts,.js}'],
        synchronize: true,
        logging: false,
        dropSchema: false, // false en producion xq reinicia la tablas y las vuelve  a crear
      }),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsServices: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    await this.categoriesService.seedCategories();
    console.log('Categorias cargadas...');
    await this.productsServices.addProducts();
    console.log('Productos cargados...');
  }
}
