import {
  Injectable,
  Inject,
  LoggerService as ILoggerService,
} from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Attributes,
  trace,
  SpanStatusCode,
  SpanKind,
} from '@opentelemetry/api';

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

  logSpan(message: string, data?: Attributes): void {
    const tracer = trace.getTracer('tracer');
    const span = tracer.startSpan(message);

    span.setStatus({ code: SpanStatusCode.OK });

    if (data) {
      span.setAttributes(data);
    }

    span.end();
  }

  // Workaround to simulate exception logging
  errorSpan(message: string, stack?: string, data?: Attributes): void {
    const tracer = trace.getTracer('tracer');
    const span = tracer.startSpan(message);

    span.setStatus({ code: SpanStatusCode.ERROR });

    if (stack) {
      span.setAttribute('stack', stack.split('\n').splice(0, 4).join('\n'));
    }

    if (data) {
      span.setAttributes(data);
    }

    span.end();
  }

  exceptionSpan(error: Error): void {
    const tracer = trace.getTracer('tracer');
    const span = tracer.startSpan(error.message, {
      kind: SpanKind.SERVER,
    });

    span.recordException(error);
    span.end();
  }

  exceptionActiveSpan(error: Error): void {
    const span = trace.getActiveSpan();

    span.recordException(error);
  }
}
