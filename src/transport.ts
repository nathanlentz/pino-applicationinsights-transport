import { TelemetryClient } from "applicationinsights";
import type { PinoApplicationInsightsOptions } from "./types";

export class ApplicationInsightsTransport {
  /**
   * Application Insights Instance
   */
  private context: TelemetryClient;

  /**
   * Configuration options
   * @private
   */
  private config: PinoApplicationInsightsOptions;

  constructor(options: PinoApplicationInsightsOptions) {
    this.context = new TelemetryClient();
    this.config = options;

    if (options.onInit) {
      options.onInit();
    }
  }

  processLog(data: any) {
    const props = Object.assign({}, data);
    delete props.msg;
    const log = {
      message: `${data.name}: ${data.msg}`,
      severity: data.level,
      properties: props,
    };

    if (data.level >= 50) {
      const err = new Error(data.msg);
      err.stack = data.stack || data.err?.stack || "";

      this.context.trackException({
        exception: err,
      });
    } else {
      this.context.trackTrace(log);
    }

    if (this.config.onDebug) {
      this.config.onDebug(
        `${data.name} Sending log to Application Insights completed`,
      );
    }
  }
}
