import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entityes';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, CategoriesRepository],
  exports: [ProductsService, ProductRepository, CategoriesRepository],
})
export class ProductsModule {}
