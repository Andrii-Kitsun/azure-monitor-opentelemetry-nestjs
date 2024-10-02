import { registerAs, ConfigFactory } from '@nestjs/config';
import { NodeEnv, LogLevel, Namespace } from '../constants';

export interface ServerConfigInterface {
  nodeEnv: NodeEnv;
  serverPort: string;
  serviceName: string;
  logging: {
    logLevel: LogLevel;
  };
}

export const ServerConfig = registerAs<
  ServerConfigInterface,
  ConfigFactory<ServerConfigInterface>
>(Namespace.SERVER, () => ({
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || NodeEnv.LOCAL,
  serverPort: process.env.PORT || '3000',
  serviceName: process.env.SERVICE_NAME!,
  logging: {
    logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO,
  },
}));
