import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({//class-validator로 파이프를 만들어 검증
    whitelist: true,//dto 검증
    forbidNonWhitelisted: true,//잘못된 값 보내면 막아줌
    transform: true,//class-transformer로 서버로 데이터가 넘어올 때 자동으로 형변환 해줌
  }));
  await app.listen(3000);
}
bootstrap();
