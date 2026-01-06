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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class createProductsDto {
    name;
    description;
    price;
    stock;
    imgUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, imgUrl: { required: true, type: () => String } };
    }
}
exports.createProductsDto = createProductsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'Laptop' }),
    __metadata("design:type", String)
], createProductsDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product description',
        example: 'A high-end laptop',
    }),
    __metadata("design:type", String)
], createProductsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 1500 }),
    __metadata("design:type", Number)
], createProductsDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ description: 'Product stock', example: 50 }),
    __metadata("design:type", Number)
], createProductsDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product image URL',
        example: 'http://image.url',
    }),
    __metadata("design:type", String)
], createProductsDto.prototype, "imgUrl", void 0);
class updateProduct {
    name;
    description;
    price;
    stock;
    imgUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, imgUrl: { required: true, type: () => String } };
    }
}
exports.updateProduct = updateProduct;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({ description: 'Product name', example: 'Laptop' }),
    __metadata("design:type", String)
], updateProduct.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product description',
        example: 'A high-end laptop',
    }),
    __metadata("design:type", String)
], updateProduct.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ description: 'Product price', example: 1500 }),
    __metadata("design:type", Number)
], updateProduct.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ description: 'Product stock', example: 50 }),
    __metadata("design:type", Number)
], updateProduct.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product image URL',
        example: 'http://image.url',
    }),
    __metadata("design:type", String)
], updateProduct.prototype, "imgUrl", void 0);
//# sourceMappingURL=creatProducts.dto.js.map