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
exports.CreateOrderDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDTO {
    idUser;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { idUser: { required: true, type: () => String }, products: { required: true, type: () => [({ id: { required: true, type: () => String } })] } };
    }
}
exports.CreateOrderDTO = CreateOrderDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: '4bc53532-a168-4591-9a43-0ab4d1d0c241',
        description: 'El ID del usuario que realiza el pedido en formato UUID',
    }),
    __metadata("design:type", String)
], CreateOrderDTO.prototype, "idUser", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: [
            { id: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' },
            { id: '6p5o4n3m-2l1k0j-9i8h-7g6f-5e4d3c2b1a0' },
        ],
        description: 'Lista de productos incluidos en el pedido, cada uno identificado por su ID en formato UUID',
    }),
    __metadata("design:type", Array)
], CreateOrderDTO.prototype, "products", void 0);
//# sourceMappingURL=createOrders.dto.js.map