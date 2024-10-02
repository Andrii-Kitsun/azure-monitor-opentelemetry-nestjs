import { Injectable, Inject } from '@nestjs/common';
import { ServerConfig, ServerConfigInterface } from '../../server.config';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston/dist/winston.interfaces';
import { transports, format } from 'winston';
import * as Transport from 'winston-transport';
import { utilities } from 'nest-winston';
import { NodeEnv } from '../../../constants';

@Injectable()
export class WinstonProvider implements WinstonModuleOptionsFactory {
  constructor(
    @Inject(ServerConfig.KEY)
    private readonly serverConfig: ServerConfigInterface,
  ) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const { nodeEnv, serviceName, logging } = this.serverConfig;
    const isLocalEnv = nodeEnv === NodeEnv.LOCAL;
    const transportsToUse: Transport[] = [];

    if (isLocalEnv) {
      transportsToUse.push(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike(serviceName, {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      );
    } else {
      transportsToUse.push(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.metadata(),
            format.json(),
          ),
        }),
      );
    }

    return {
      level: logging.logLevel,
      transports: transportsToUse,
    };
  }
}
