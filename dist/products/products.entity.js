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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const categories_entityes_1 = require("../categories/categories.entityes");
const orderDetails_entyties_1 = require("../orderDetails/orderDetails.entyties");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Product = class Product {
    id = (0, uuid_1.v4)();
    name;
    description;
    price;
    stock;
    imgUrl;
    category;
    orderDetails;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, imgUrl: { required: true, type: () => String }, category: { required: true, type: () => require("../categories/categories.entityes").Category }, orderDetails: { required: true, type: () => [require("../orderDetails/orderDetails.entyties").OrderDetail] } };
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 50, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 10, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'https://via.placeholder.com/150', length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entityes_1.Category, (category) => category.products),
    __metadata("design:type", categories_entityes_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entyties_1.OrderDetail, (orderDetail) => orderDetail.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Product);
//# sourceMappingURL=products.entity.js.map