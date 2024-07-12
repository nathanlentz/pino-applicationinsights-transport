import { KnownSeverityLevel } from "applicationinsights";

export const convertLevel = (level: number | string): string => {
  if (typeof level === "string") {
    return level;
  }

  if (level >= 60) {
    return KnownSeverityLevel.Critical;
  }
  if (level >= 50) {
    return KnownSeverityLevel.Error;
  }
  if (level >= 40) {
    return KnownSeverityLevel.Warning;
  }
  if (level >= 30) {
    return KnownSeverityLevel.Information;
  }
  if (level >= 20) {
    return KnownSeverityLevel.Verbose;
  }

  return KnownSeverityLevel.Information;
};
