import { Category } from './categories.entityes';
import { Repository } from 'typeorm';
export declare class CategoriesRepository {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(categories: string[]): Promise<string>;
}
