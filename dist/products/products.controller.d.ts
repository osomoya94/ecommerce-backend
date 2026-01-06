import { ProductsService } from './products.service';
import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getUsers(page?: number, limit?: number): Promise<import("./products.entity").Product[]>;
    createProduct(product: createProductsDto): Promise<string>;
    updateProduct(id: string, productData: Partial<updateProduct>): Promise<string | import("./products.entity").Product>;
    deleteProduct(id: string): Promise<string>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<string | import("./products.entity").Product>;
}
