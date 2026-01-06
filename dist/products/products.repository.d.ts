import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entityes';
export declare class ProductRepository {
    private readonly productRepository;
    private readonly categoriesRepository;
    constructor(productRepository: Repository<Product>, categoriesRepository: Repository<Category>);
    fillProducts(page: number, limit: number): Promise<Product[]>;
    createProduct(newProduct: createProductsDto): Promise<string>;
    updateProductById(id: string, productData: Partial<updateProduct>): Promise<string>;
    deleteProductById(id: string): Promise<string>;
    getById(id: string): Promise<Product | string>;
    addProducts(): Promise<string>;
}
