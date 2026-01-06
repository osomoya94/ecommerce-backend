import { ProductRepository } from './products.repository';
import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
import { Product } from './products.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: ProductRepository);
    getProducts(page: number, limit: number): Promise<Product[]>;
    createProduct(product: createProductsDto): Promise<string>;
    updateProduct(id: string, productData: Partial<updateProduct>): Promise<Product | string>;
    deleteProductById(id: string): Promise<string>;
    getProductById(id: string): Promise<Product | string>;
    addProducts(): Promise<string>;
}
