import {
  useAzureMonitor,
  AzureMonitorOpenTelemetryOptions,
} from '@azure/monitor-opentelemetry';
import { configDotenv } from 'dotenv';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { FastifyInstrumentation } from '@opentelemetry/instrumentation-fastify';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { trace, metrics } from '@opentelemetry/api';
import { HttpInstrumentationConfig } from '@opentelemetry/instrumentation-http';
import { IncomingMessage } from 'node:http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { NodeEnv } from '../../../constants';
import { SpanEnrichingProcessor } from './span-enriching.processor';

configDotenv();

export class AzureMonitorHelper {
  static init(): void {
    if (process.env.NODE_ENV === NodeEnv.LOCAL) {
      return;
    }

    console.log('Initializing Azure Monitor');

    const httpInstrumentationConfig: HttpInstrumentationConfig = {
      enabled: true,
      ignoreIncomingRequestHook: (request: IncomingMessage) => {
        return request.method === 'OPTIONS';
      },
    };

    const customResource = Resource.EMPTY;
    customResource.attributes[ATTR_SERVICE_NAME] = process.env.SERVICE_NAME;

    const options: AzureMonitorOpenTelemetryOptions = {
      azureMonitorExporterOptions: {
        connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      },
      resource: customResource,
      spanProcessors: [new SpanEnrichingProcessor()],
      instrumentationOptions: {
        http: httpInstrumentationConfig,
        winston: { enabled: true },
      },
    };

    useAzureMonitor(options);

    this.addOpenTelemetryInstrumentation();
  }

  static addOpenTelemetryInstrumentation(): void {
    const instrumentations = [
      new NestInstrumentation(),
      new FastifyInstrumentation(),
    ];

    registerInstrumentations({
      tracerProvider: trace.getTracerProvider(),
      meterProvider: metrics.getMeterProvider(),
      instrumentations: instrumentations,
    });
  }
}
