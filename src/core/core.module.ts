import { Module } from '@nestjs/common';
import { LoggerModule } from './modules';

@Module({
  imports: [LoggerModule],
})
export class CoreModule {}
