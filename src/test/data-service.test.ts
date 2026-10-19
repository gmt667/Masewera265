import { describe, expect, it, vi } from "vitest";
import { createConnectedDataClient } from "@/lib/data-service";

function response(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function mockFetch(implementation: () => Promise<Response>) {
  const mocked = vi.fn((_input: RequestInfo | URL, _init?: RequestInit) => implementation());
  return mocked as typeof mocked & typeof fetch;
}

describe("connected public data client", () => {
  it("reports missing public API configuration without retrying", async () => {
    const result = await createConnectedDataClient({}).fetchResource("sports");

    expect(result).toMatchObject({ state: "unavailable", errorCode: "CONFIGURATION", retryable: false });
  });

  it("accepts a valid envelope, preserves pagination and encodes query parameters", async () => {
    const fetchImpl = mockFetch(async () => response({
      data: [{ slug: "football", name: "Football" }],
      updatedAt: "2026-10-19T10:00:00+02:00",
      pagination: { page: 1, pageSize: 20, total: 1, totalPages: 1 },
    }));
    const client = createConnectedDataClient({ baseUrl: "https://api.example.test/", fetchImpl });

    const result = await client.fetchResource("sports", { sport: "women's football", page: 1 });

    expect(result).toMatchObject({ state: "ready", retryable: false, pagination: { total: 1 } });
    expect(String(fetchImpl.mock.calls[0]?.[0])).toContain("sport=women%27s+football");
  });

  it("preserves empty and stale states", async () => {
    const emptyClient = createConnectedDataClient({
      baseUrl: "https://api.example.test",
      fetchImpl: mockFetch(async () => response({ data: [], updatedAt: "2026-10-19T10:00:00+02:00" })),
    });
    const staleClient = createConnectedDataClient({
      baseUrl: "https://api.example.test",
      fetchImpl: mockFetch(async () => response({ data: [{ slug: "football", name: "Football" }], stale: true })),
    });

    await expect(emptyClient.fetchResource("sports")).resolves.toMatchObject({ state: "empty", retryable: false });
    await expect(staleClient.fetchResource("sports")).resolves.toMatchObject({ state: "stale", retryable: true });
  });

  it("rejects malformed records and pagination", async () => {
    const badRecord = createConnectedDataClient({
      baseUrl: "https://api.example.test",
      fetchImpl: mockFetch(async () => response({ data: [{ name: "Missing slug" }] })),
    });
    const badPagination = createConnectedDataClient({
      baseUrl: "https://api.example.test",
      fetchImpl: mockFetch(async () => response({ data: [], pagination: { page: -1 } })),
    });

    await expect(badRecord.fetchResource("sports")).resolves.toMatchObject({ state: "error", errorCode: "INVALID_RESPONSE", retryable: false });
    await expect(badPagination.fetchResource("sports")).resolves.toMatchObject({ state: "error", errorCode: "INVALID_RESPONSE", retryable: false });
  });

  it("classifies HTTP and timeout failures by retry safety", async () => {
    const unavailable = createConnectedDataClient({ baseUrl: "https://api.example.test", fetchImpl: mockFetch(async () => response({}, 503)) });
    const rejected = createConnectedDataClient({ baseUrl: "https://api.example.test", fetchImpl: mockFetch(async () => response({}, 400)) });
    const timedOut = createConnectedDataClient({
      baseUrl: "https://api.example.test",
      fetchImpl: mockFetch(async () => { throw Object.assign(new Error("late"), { name: "TimeoutError" }); }),
    });

    await expect(unavailable.fetchResource("sports")).resolves.toMatchObject({ errorCode: "HTTP", retryable: true });
    await expect(rejected.fetchResource("sports")).resolves.toMatchObject({ errorCode: "HTTP", retryable: false });
    await expect(timedOut.fetchResource("sports")).resolves.toMatchObject({ errorCode: "TIMEOUT", retryable: true });
  });

  it("classifies navigation cancellation without offering retry", async () => {
    const controller = new AbortController();
    const fetchImpl = mockFetch(async () => {
      controller.abort();
      throw Object.assign(new Error("cancelled"), { name: "AbortError" });
    });
    const client = createConnectedDataClient({ baseUrl: "https://api.example.test", fetchImpl });

    await expect(client.fetchResource("sports", undefined, { signal: controller.signal })).resolves.toMatchObject({
      state: "error",
      errorCode: "CANCELLED",
      retryable: false,
    });
  });

  it("returns empty for missing items and coalesces identical in-flight reads", async () => {
    const missing = createConnectedDataClient({ baseUrl: "https://api.example.test", fetchImpl: mockFetch(async () => response({}, 404)) });
    await expect(missing.fetchItem("sports", "missing")).resolves.toMatchObject({ state: "empty" });

    let resolveResponse!: (value: Response) => void;
    const deferred = new Promise<Response>((resolve) => { resolveResponse = resolve; });
    const fetchImpl = mockFetch(() => deferred);
    const client = createConnectedDataClient({ baseUrl: "https://api.example.test", fetchImpl });
    const first = client.fetchResource("sports");
    const second = client.fetchResource("sports");
    resolveResponse(response([{ slug: "football", name: "Football" }]));

    await expect(Promise.all([first, second])).resolves.toHaveLength(2);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
