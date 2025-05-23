import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, //오류 발생, 걸러내는 기능(whitelist)이 켜져 있어야 가능
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
