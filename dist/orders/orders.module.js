"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("./orders.service");
const orders_repository_1 = require("./orders.repository");
const orders_entity_1 = require("./orders.entity");
const typeorm_1 = require("@nestjs/typeorm");
const products_repository_1 = require("../products/products.repository");
const products_entity_1 = require("../products/products.entity");
const users_entitys_1 = require("../users/users.entitys");
const users_repository_1 = require("../users/users.repository");
const categories_repository_1 = require("../categories/categories.repository");
const categories_entityes_1 = require("../categories/categories.entityes");
const orderDetails_entyties_1 = require("../orderDetails/orderDetails.entyties");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([orders_entity_1.Order, products_entity_1.Product, users_entitys_1.User, categories_entityes_1.Category, orderDetails_entyties_1.OrderDetail]),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_service_1.OrdersService,
            orders_repository_1.OrderRepository,
            users_repository_1.UsersRepository,
            products_repository_1.ProductRepository,
            categories_repository_1.CategoriesRepository,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map