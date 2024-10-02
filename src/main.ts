import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ServerConfigInterface, ServerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const { serverPort } = app.get<ServerConfigInterface>(ServerConfig.KEY);

  await app.listen(serverPort, '0.0.0.0');
}

bootstrap();
