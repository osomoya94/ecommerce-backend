import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import productsData from '../data/products.json';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async seedCategories() {
    const categoryNamesFromFile = productsData.map(
      (product) => product.category,
    );

    const uniqueCategoryNames = [...new Set(categoryNamesFromFile)];

    return this.categoriesRepository.addCategories(uniqueCategoryNames);
  }

  async getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
