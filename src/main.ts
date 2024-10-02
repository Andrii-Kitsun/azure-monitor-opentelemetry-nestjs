import { AzureMonitorHelper } from './core/helpers';

AzureMonitorHelper.init();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ServerConfigInterface, ServerConfig } from './config';
import { LoggerService } from './core/modules';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(LoggerService));

  const { serverPort } = app.get<ServerConfigInterface>(ServerConfig.KEY);

  await app.listen(serverPort, '0.0.0.0');
}

bootstrap();
