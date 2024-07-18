import appInsights from "applicationinsights";
import build from "pino-abstract-transport";
import { convertLevel } from "./convert-level";
import { ApplicationInsightsTransport } from "./transport";
import type { PinoApplicationInsightsOptions } from "./types";

export default (options: PinoApplicationInsightsOptions) => {
  if (!appInsights.defaultClient) {
    throw Error(
      "AppInsights Client not instantiated. Ensure .setup() is called before Pino"
    );
  }
  const transport = new ApplicationInsightsTransport(options);

  return build(async function processLogs(source) {
    for await (const obj of source) {
      if (!obj) {
        if (options.enableDebug) {
          console.warn("Log source object is empty");
        }

        return;
      }

      transport.processLog({
        ...obj,
        level: convertLevel(obj.level),
      });
    }
  });
};
