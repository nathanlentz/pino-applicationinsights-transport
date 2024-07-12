import { vi, describe, it, expect, beforeEach } from "vitest";
import { convertLevel } from "../src/convert-level";
import buildTransport from "../src/index";
import type { PinoApplicationInsightsOptions } from "../src/types";
import { ApplicationInsightsTransport } from "../src/transport";

vi.mock("pino-abstract-transport", () => ({
  default: vi.fn().mockImplementation((processLogs) => processLogs),
}));

vi.mock("../src/transport", () => ({
  ApplicationInsightsTransport: vi.fn().mockImplementation(() => ({
    processLog: vi.fn(),
  })),
}));

vi.mock("../src/convert-level", () => ({
  convertLevel: vi.fn().mockReturnValue("debug"),
}));

vi.mock("applicationinsights", () => ({
  default: {
    defaultClient: {},
  },
}));

const baseOptions: PinoApplicationInsightsOptions = {
  onDebug: vi.fn(),
};

describe("AppInsights transport", () => {
  const processLogSpy = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore: Don't need to mock any other items
    vi.mocked(ApplicationInsightsTransport).mockImplementation(() => ({
      processLog: processLogSpy,
    }));
  });

  it("should process logs correctly", async () => {
    const transport = buildTransport(baseOptions);
    const source = async function* () {
      yield { level: 10, date: "2023-01-01", msg: "test log" };
    };

    //@ts-ignore
    await transport(source());

    expect(vi.mocked(ApplicationInsightsTransport).mock.calls.length).toBe(1);
    expect(vi.mocked(ApplicationInsightsTransport).mock.calls[0][0]).toEqual(
      baseOptions,
    );
    expect(convertLevel).toHaveBeenCalledWith(10);
    expect(processLogSpy).toHaveBeenCalledWith({
      level: "debug",
      date: "2023-01-01",
      msg: "test log",
    });
  });

  it("should call onDebug if log source object is empty", async () => {
    const onDebug = vi.fn();
    const mockOptions = { ...baseOptions, onDebug };
    const transport = buildTransport(mockOptions);
    const source = async function* () {
      yield null;
    };

    //@ts-ignore
    await transport(source());

    expect(onDebug).toHaveBeenCalledWith("Log source object is empty");
  });
});
