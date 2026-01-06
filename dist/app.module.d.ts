import { OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly categoriesService;
    private readonly productsServices;
    constructor(categoriesService: CategoriesService, productsServices: ProductsService);
    onApplicationBootstrap(): Promise<void>;
}
