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
exports.updateUser = exports.createUser = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class createUser {
    name;
    email;
    password;
    address;
    phone;
    country;
    city;
    confirmPassword;
    isAdmin = false;
    birthdate;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String, minLength: 5, maxLength: 20 }, city: { required: true, type: () => String, minLength: 5, maxLength: 20 }, confirmPassword: { required: true, type: () => String, minLength: 8 }, isAdmin: { required: false, type: () => Boolean, default: false }, birthdate: { required: true, type: () => String } };
    }
}
exports.createUser = createUser;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        example: 'isAdmin',
        description: 'Nombre completo del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 'isAdmin@gmail.com',
        description: 'Correo electrónico del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 15),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
    }),
    (0, swagger_1.ApiProperty)({
        example: 'P@ssw0rd!',
        description: 'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
    }),
    __metadata("design:type", String)
], createUser.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        example: 'Calle Falsa 123',
        description: 'Dirección del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        example: 123456781,
        description: 'Número de teléfono del usuario',
    }),
    __metadata("design:type", Number)
], createUser.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        example: 'Argentina',
        description: 'País del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        example: 'Buenos Aires',
        description: 'Ciudad del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    (0, swagger_1.ApiProperty)({
        example: 'P@ssw0rd!',
        description: 'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
    }),
    __metadata("design:type", String)
], createUser.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiProperty)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], createUser.prototype, "isAdmin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '1990-01-01',
        description: 'Fecha de nacimiento del usuario',
    }),
    __metadata("design:type", String)
], createUser.prototype, "birthdate", void 0);
class updateUser {
    name;
    email;
    password;
    address;
    phone;
    country;
    city;
    isAdmin;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String, minLength: 3, maxLength: 80 }, email: { required: false, type: () => String, format: "email" }, password: { required: false, type: () => String, minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, address: { required: false, type: () => String, minLength: 3, maxLength: 80 }, phone: { required: false, type: () => Number }, country: { required: false, type: () => String, minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, minLength: 5, maxLength: 20 }, isAdmin: { required: false, type: () => Boolean } };
    }
}
exports.updateUser = updateUser;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        example: 'isAdmin',
        description: 'Nombre completo del usuario',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'isAdmin@gmail.com',
        description: 'Correo electrónico del usuario',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(8, 15),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/),
    (0, swagger_1.ApiProperty)({
        example: 'P@ssw0rd!',
        description: 'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 80),
    (0, swagger_1.ApiProperty)({
        example: 'Calle Falsa 123',
        description: 'Dirección del usuario',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        example: 12345678,
        description: 'Número de teléfono del usuario',
    }),
    __metadata("design:type", Number)
], updateUser.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        example: 'Argentina',
        description: 'País del usuario',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(5, 20),
    (0, swagger_1.ApiProperty)({
        example: 'Buenos Aires',
        description: 'Ciudad del usuario',
    }),
    __metadata("design:type", String)
], updateUser.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Indica si el usuario es administrador',
    }),
    __metadata("design:type", Boolean)
], updateUser.prototype, "isAdmin", void 0);
//# sourceMappingURL=createUser.dto.js.map