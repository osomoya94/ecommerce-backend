import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductRepository) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.fillProducts(page, limit);
  }

  async createProduct(product: createProductsDto): Promise<string> {
    return this.productsRepository.createProduct(product);
  }

  async updateProduct(
    id: string,
    productData: Partial<updateProduct>,
  ): Promise<Product | string> {
    return this.productsRepository.updateProductById(id, productData);
  }

  async deleteProductById(id: string): Promise<string> {
    return this.productsRepository.deleteProductById(id);
  }

  async getProductById(id: string): Promise<Product | string> {
    return this.productsRepository.getById(id);
  }

  async addProducts() {
    return this.productsRepository.addProducts();
  }
}
