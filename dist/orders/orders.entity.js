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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const orderDetails_entyties_1 = require("../orderDetails/orderDetails.entyties");
const users_entitys_1 = require("../users/users.entitys");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Order = class Order {
    id = (0, uuid_1.v4)();
    date;
    total;
    details;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, date: { required: true, type: () => Date }, total: { required: true, type: () => Number }, details: { required: true, type: () => require("../orderDetails/orderDetails.entyties").OrderDetail }, user: { required: true, type: () => require("../users/users.entitys").User } };
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orderDetails_entyties_1.OrderDetail, (orderDetail) => orderDetail.order),
    (0, typeorm_1.JoinColumn)({ name: 'order_detail_id' }),
    __metadata("design:type", orderDetails_entyties_1.OrderDetail)
], Order.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entitys_1.User, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entitys_1.User)
], Order.prototype, "user", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' })
], Order);
//# sourceMappingURL=orders.entity.js.map