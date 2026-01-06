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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_entitys_1 = require("./users/users.entitys");
const products_entity_1 = require("./products/products.entity");
const orders_entity_1 = require("./orders/orders.entity");
const orderDetails_entyties_1 = require("./orderDetails/orderDetails.entyties");
const categories_entityes_1 = require("./categories/categories.entityes");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const categories_service_1 = require("./categories/categories.service");
const products_service_1 = require("./products/products.service");
const files_module_1 = require("./files/files.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
    categoriesService;
    productsServices;
    constructor(categoriesService, productsServices) {
        this.categoriesService = categoriesService;
        this.productsServices = productsServices;
    }
    async onApplicationBootstrap() {
        await this.categoriesService.seedCategories();
        console.log('Categorias cargadas...');
        await this.productsServices.addProducts();
        console.log('Productos cargados...');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env.development',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [users_entitys_1.User, products_entity_1.Product, orders_entity_1.Order, orderDetails_entyties_1.OrderDetail, categories_entityes_1.Category],
                    migrations: ['dist/migrations/*{.ts,.js}'],
                    synchronize: true,
                    logging: false,
                    dropSchema: false,
                }),
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            files_module_1.FilesModule,
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        products_service_1.ProductsService])
], AppModule);
//# sourceMappingURL=app.module.js.map