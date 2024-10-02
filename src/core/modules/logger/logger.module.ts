import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonProvider } from '../../../config';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonProvider,
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
