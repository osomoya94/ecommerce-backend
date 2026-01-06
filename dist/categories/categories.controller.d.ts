import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    seedCategories(): Promise<string>;
    getCategories(): Promise<import("./categories.entityes").Category[]>;
}
