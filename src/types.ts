export interface PinoApplicationInsightsOptions {
  /**
   * ApplicationInsights Connection string
   *  NOT CURRENTLY USED FOR ANYTHING
   */
  connectionString?: string;

  /**
   * The name of the application or service generating the log events
   */
  service?: string;

  /**
   * Called when the plugin is ready to process logs.
   */
  onInit?: () => void;

  /**
   * Error handler for when the submitLog() call fails. See readme on how to
   * properly implement this callback.
   */
  onError?: (err: any, logs?: Array<Record<string, any>>) => void;
  /**
   * Define this callback to get debug messages from this transport
   */
  onDebug?: (msg: string) => void;

  /**
   * Will log debug events if enabled
   */
  enableDebug?: boolean;
}

export interface LogItem {
  level: string | number;
  msg: string;
}
