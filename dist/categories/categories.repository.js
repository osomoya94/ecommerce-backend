"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entityes_1 = require("./categories.entityes");
const typeorm_2 = require("typeorm");
let CategoriesRepository = class CategoriesRepository {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async getCategories() {
        const categoriesFind = this.categoriesRepository.find();
        return categoriesFind;
    }
    async addCategories(categories) {
        const existingCategories = await this.getCategories();
        const existingCategoryNames = existingCategories.map((cat) => cat.name);
        const newCategoryNames = categories.filter((categoryName) => !existingCategoryNames.includes(categoryName));
        if (newCategoryNames.length === 0) {
            return 'No hay categorías nuevas para agregar. La base de datos ya está actualizada.';
        }
        const newCategories = newCategoryNames.map((name) => {
            const category = new categories_entityes_1.Category();
            category.name = name;
            return category;
        });
        await this.categoriesRepository.save(newCategories);
        return `Se agregaron exitosamente ${newCategories.length} categorías nuevas.`;
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entityes_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map