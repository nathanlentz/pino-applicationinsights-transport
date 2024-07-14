# pino-applicationinsights-transport

A pino v7+ transport for sending logs to Application Insights.

It uses applicationinsights to send logs using the v2 node telemetry client.

## Installation Instructions

`npm install pino-applicationinsights-transport`

```ts
import { LoggerOptions, pino } from "pino";

const logger = pino({
  level: "trace",
  transports: [
    {
      target: "pino-applicationinsights-transport",
      options: {},
    },
  ],
});
```

```

```

```

```
