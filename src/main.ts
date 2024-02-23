import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      status: 'fail',
      message: exception.message,
      data: null,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const message =
          errors[0].constraints?.[Object.keys(errors[0].constraints)[0]] ||
          'Bad request';
        return new BadRequestException({ status: 'fail', message, data: null });
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = new DocumentBuilder()
    .setTitle('FC Meals API')
    .setDescription('FC Meals API documentation')
    .setVersion('1.0')
    .addTag('meals')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, document));
  await app.listen(3000);
}
bootstrap();
