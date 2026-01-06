import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  async seedCategories() {
    return await this.categoriesService.seedCategories();
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
}
