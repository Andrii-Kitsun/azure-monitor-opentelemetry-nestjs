import { registerAs, ConfigFactory } from '@nestjs/config';
import { NodeEnv } from '../constants/node-env.constants';
import { Namespace } from '../constants/namespace.contsnts';

export interface ServerConfigInterface {
  nodeEnv: NodeEnv;
  serverPort: string;
  serviceName: string;
}

export const ServerConfig = registerAs<
  ServerConfigInterface,
  ConfigFactory<ServerConfigInterface>
>(Namespace.SERVER, () => ({
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || NodeEnv.LOCAL,
  serverPort: process.env.PORT || '3000',
  serviceName: process.env.SERVICE_NAME!,
}));
