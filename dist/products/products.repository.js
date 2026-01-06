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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("./products.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const categories_entityes_1 = require("../categories/categories.entityes");
const products_json_1 = __importDefault(require("../data/products.json"));
let ProductRepository = class ProductRepository {
    productRepository;
    categoriesRepository;
    constructor(productRepository, categoriesRepository) {
        this.productRepository = productRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async fillProducts(page, limit) {
        const skip = (page - 1) * limit;
        const productTotal = await this.productRepository.find({
            skip: skip,
            take: limit,
            relations: ['category'],
        });
        return productTotal;
    }
    async createProduct(newProduct) {
        const name = newProduct.name;
        const findName = await this.productRepository.findOne({ where: { name } });
        if (findName) {
            return 'Existe un producto ya con ese nombre';
        }
        const product = this.productRepository.create(newProduct);
        await this.productRepository.save(product);
        return 'Producto creado con exito';
    }
    async updateProductById(id, productData) {
        const productFind = await this.productRepository.findOne({ where: { id } });
        if (!productFind) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (productData.name) {
            const nameExists = await this.productRepository.findOne({
                where: { name: productData.name },
            });
            if (nameExists && nameExists.id !== id) {
                throw new common_1.ConflictException('El nombre del producto ya está en uso');
            }
        }
        try {
            await this.productRepository.update(id, productData);
            return `El producto de ${id} fue actualizado`;
        }
        catch (err) {
            if (err &&
                err.driverError &&
                err.driverError.code === '23505') {
                throw new common_1.ConflictException('Ya existe un producto con ese nombre');
            }
            throw err;
        }
    }
    async deleteProductById(id) {
        const productFind = await this.productRepository.findOne({ where: { id } });
        if (!productFind) {
            return 'Producto no encontrado';
        }
        await this.productRepository.delete({ id });
        return 'El producto de id: ' + id + ' ha sido eliminado correctamente';
    }
    async getById(id) {
        const productFind = await this.productRepository.findOne({ where: { id } });
        if (productFind) {
            return productFind;
        }
        return 'Producto no encontrado';
    }
    async addProducts() {
        const categories = await this.categoriesRepository.find();
        for (const productData of products_json_1.default) {
            const category = categories.find((cat) => cat.name === productData.category);
            if (!category) {
                console.log(`Categoría "${productData.category}" no encontrada, saltando producto "${productData.name}".`);
                continue;
            }
            const product = this.productRepository.create({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                category: category,
            });
            await this.productRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Product)
                .values(product)
                .orUpdate(['description', 'price', 'stock'], ['name'])
                .execute();
        }
        return 'Productos agregados o actualizados exitosamente';
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entityes_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=products.repository.js.map