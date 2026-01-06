import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entityes';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categoriesFind = this.categoriesRepository.find();
    return categoriesFind;
  }

  async addCategories(categories: string[]): Promise<string> {
    const existingCategories = await this.getCategories();
    const existingCategoryNames = existingCategories.map((cat) => cat.name);

    const newCategoryNames = categories.filter(
      (categoryName) => !existingCategoryNames.includes(categoryName),
    );

    if (newCategoryNames.length === 0) {
      return 'No hay categorías nuevas para agregar. La base de datos ya está actualizada.';
    }

    const newCategories = newCategoryNames.map((name) => {
      const category = new Category();
      category.name = name;
      return category;
    });

    await this.categoriesRepository.save(newCategories);

    return `Se agregaron exitosamente ${newCategories.length} categorías nuevas.`;
  }
}
