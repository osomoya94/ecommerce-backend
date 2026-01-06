"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const loggermilddware_middleware_1 = require("./loggermilddware/loggermilddware.middleware");
const date_adder_interceptor_1 = require("./interceptors/date-adder.interceptor");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
            const cleanErrors = errors.map((error) => {
                return {
                    property: error.property,
                    constraints: error.constraints,
                };
            });
            throw new common_1.BadRequestException({
                alert: 'Se han detectado los siguientes errores en la petición:',
                errors: cleanErrors,
            });
        },
    }));
    app.use(loggermilddware_middleware_1.loggerGlobalMiddleware);
    app.useGlobalInterceptors(new date_adder_interceptor_1.DateAdderInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Demo Nest')
        .setDescription('Esta es un API construida para ser empleada en los demos del modulo 4 de la es[ecialidad Backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map