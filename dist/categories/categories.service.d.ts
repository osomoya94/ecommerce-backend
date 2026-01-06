import { CategoriesRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    seedCategories(): Promise<string>;
    getCategories(): Promise<import("./categories.entityes").Category[]>;
}
