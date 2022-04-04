// require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    // origin: 'http://localhost:4000',
    // credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
