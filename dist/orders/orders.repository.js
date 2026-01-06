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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_entity_1 = require("./orders.entity");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../products/products.entity");
const users_repository_1 = require("../users/users.repository");
const users_entitys_1 = require("../users/users.entitys");
const orderDetails_entyties_1 = require("../orderDetails/orderDetails.entyties");
let OrderRepository = class OrderRepository {
    orderRepository;
    productRepository;
    userRepositoryMetodo;
    userRepository;
    constructor(orderRepository, productRepository, userRepositoryMetodo, userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepositoryMetodo = userRepositoryMetodo;
        this.userRepository = userRepository;
    }
    async addOrder(idUser, products) {
        const userFind = await this.userRepositoryMetodo.getById(idUser);
        if (typeof userFind === 'string') {
            return userFind;
        }
        const productIds = products.map((product) => product.id);
        const productList = await this.productRepository
            .createQueryBuilder('product')
            .where('product.id IN (:...ids)', { ids: productIds })
            .andWhere('product.stock > 0')
            .getMany();
        if (!productList.length) {
            return 'No hay productos disponibles con stock';
        }
        let total = 0;
        for (const product of productList) {
            total += Number(product.price);
            product.stock -= 1;
            await this.productRepository.save(product);
        }
        const orderDetail = this.orderRepository.manager.create(orderDetails_entyties_1.OrderDetail, {
            price: total,
            products: productList,
        });
        await this.orderRepository.manager.save(orderDetail);
        const order = this.orderRepository.create({
            user: userFind,
            total,
            date: new Date(),
            details: orderDetail,
        });
        await this.orderRepository.save(order);
        return {
            message: 'Orden creada con éxito',
            orderId: order.id,
            total: order.total,
        };
    }
    async getOrder(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'details', 'details.products'],
        });
        if (!order) {
            return 'Orden no encontrada';
        }
        return {
            id: order.id,
            date: order.date,
            total: order.total,
            user: {
                id: order.user.id,
                name: order.user.name,
                email: order.user.email,
            },
            details: order.details,
        };
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entitys_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_repository_1.UsersRepository,
        typeorm_2.Repository])
], OrderRepository);
//# sourceMappingURL=orders.repository.js.map