import { SpanProcessor, ReadableSpan } from '@opentelemetry/sdk-trace-node';

export class SpanEnrichingProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  onStart(): void {}

  onEnd(span: ReadableSpan): void {
    this.modifyTelemetry(span);
  }

  modifyTelemetry(span: ReadableSpan): void {
    const instrumentationName = span.instrumentationLibrary.name;

    switch (instrumentationName) {
      case '@opentelemetry/instrumentation-http':
        return this.filterHttp(span);
      case '@opentelemetry/instrumentation-nestjs-core':
        return this.filterNest(span);
      case '@opentelemetry/instrumentation-fastify':
        return this.filterFastify(span);
    }
  }

  // @see https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-instrumentation-http
  filterHttp(span: ReadableSpan): void {
    delete span.attributes['http.target'];
    delete span.attributes['http.scheme'];
    delete span.attributes['http.client_ip'];
    delete span.attributes['http.request_content_length_uncompressed'];
    delete span.attributes['http.flavor'];
    delete span.attributes['net.transport'];
    delete span.attributes['net.host.ip'];
    delete span.attributes['net.host.name'];
    delete span.attributes['net.host.port'];
    delete span.attributes['net.peer.port'];
    delete span.attributes['net.peer.ip'];
    delete span.attributes['http.status_text'];
    delete span.attributes['http.user_agent'];
  }

  // @see https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-nestjs-core
  filterNest(span: ReadableSpan): void {
    delete span.attributes['component'];
    delete span.attributes['nestjs.version'];
    delete span.attributes['nestjs.type'];
  }

  // @see https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node/opentelemetry-instrumentation-restify
  filterFastify(span: ReadableSpan): void {
    delete span.attributes['fastify.type'];
    delete span.attributes['plugin.name'];
    delete span.attributes['hook.name'];
  }
}
