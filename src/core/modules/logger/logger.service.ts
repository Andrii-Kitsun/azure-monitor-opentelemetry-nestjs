import {
  Injectable,
  Inject,
  LoggerService as ILoggerService,
} from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerService implements ILoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  log(message: any, context?: string): any {
    return this.logger.log(message, context);
  }

  error(message: any, trace?: string, context?: string): any {
    return this.logger.error(message, trace, context);
  }

  warn(message: any, context?: string): any {
    return this.logger.warn(message, context);
  }

  debug(message: any, context?: string): any {
    return this.logger.debug?.(message, context);
  }

  verbose(message: any, context?: string): any {
    return this.logger.verbose?.(message, context);
  }

  fatal(message: any, trace?: string, context?: string): any {
    return this.logger.fatal(message, trace, context);
  }
}
