import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { LoggerService } from '../../core/modules';

@Module({
  controllers: [CatsController],
  providers: [CatsService, LoggerService],
})
export class CatsModule {}
