import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

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
  await app.listen(3000);
}
bootstrap();
