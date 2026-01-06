import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobalMiddleware } from './loggermilddware/loggermilddware.middleware';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        throw new BadRequestException({
          alert: 'Se han detectado los siguientes errores en la petición:',
          errors: cleanErrors,
        });
      },
    }),
  );
  app.use(loggerGlobalMiddleware);
  app.useGlobalInterceptors(new DateAdderInterceptor());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest')
    .setDescription(
      'Esta es un API construida para ser empleada en los demos del modulo 4 de la es[ecialidad Backend',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
