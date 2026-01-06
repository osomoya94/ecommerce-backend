"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const node_path_1 = require("node:path");
const NODE_ENV = process.env.NODE_ENV || 'development';
(0, dotenv_1.config)({ path: (0, node_path_1.resolve)(__dirname, `../.env.${NODE_ENV}`) });
const orders_entity_1 = require("./orders/orders.entity");
const orderDetails_entyties_1 = require("./orderDetails/orderDetails.entyties");
const products_entity_1 = require("./products/products.entity");
const categories_entityes_1 = require("./categories/categories.entityes");
const users_entitys_1 = require("./users/users.entitys");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [orders_entity_1.Order, orderDetails_entyties_1.OrderDetail, products_entity_1.Product, categories_entityes_1.Category, users_entitys_1.User],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    logging: NODE_ENV !== 'production',
    migrationsTableName: 'migrations_history',
});
//# sourceMappingURL=data-source.js.map