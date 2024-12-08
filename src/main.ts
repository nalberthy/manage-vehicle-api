import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const logger = new Logger('Main');

async function bootstrap() {
  const { PORT, CORS_ALLOWED_ORIGINS } = process.env;
  const app = await NestFactory.create(AppModule);
  const port = PORT ?? 3000;

  const corsOptions: CorsOptions = {
    origin: CORS_ALLOWED_ORIGINS?.split(','),
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.listen(port).then(() => {
    logger.log(`Running server in port ${port}`);
  });
}
bootstrap();
