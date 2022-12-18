import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'dev' ? ['log', 'debug', 'error', 'warn'] : ['log', 'error', 'warn'],
  });

  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
  });

  await app.listen(443);
}
bootstrap();
