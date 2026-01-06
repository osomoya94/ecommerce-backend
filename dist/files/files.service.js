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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../products/products.entity");
const files_repository_1 = require("./files.repository");
let FilesService = class FilesService {
    fileUploadRepository;
    productRepository;
    constructor(fileUploadRepository, productRepository) {
        this.fileUploadRepository = fileUploadRepository;
        this.productRepository = productRepository;
    }
    async uploadProductImage(productId, file) {
        const response = await this.fileUploadRepository.uploadImage(file);
        if (!response.secure_url) {
            throw new common_1.NotFoundException('Error al cargar imagen en Cloudinary');
        }
        await this.productRepository.update(productId, {
            imgUrl: response.secure_url,
        });
        const updated = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!updated) {
            throw new common_1.NotFoundException('Producto no encontrado tras actualizar');
        }
        return updated;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [files_repository_1.FileUploadRepository,
        typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map