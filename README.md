# pino-applicationinsights-transport

A pino v7+ transport for sending logs to Application Insights.

It uses applicationinsights to send logs using the v2 node telemetry client.

- Performs batch sending of logs on a periodic basis, or when log capacity is reached in overall log batch size or count.
- Will retry failed sends.
- Can disable batch sending and always send for each log entry.
