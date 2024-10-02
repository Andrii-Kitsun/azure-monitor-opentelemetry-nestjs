import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServerConfig } from './config';
import { CoreModule } from './core/core.module';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ServerConfig],
    }),
    CoreModule,
    CatsModule,
  ],
})
export class AppModule {}
