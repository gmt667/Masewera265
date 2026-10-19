import { describe, expect, it } from "vitest";
import { requestedPage } from "@/lib/pagination";

describe("requestedPage", () => {
  it("accepts positive integer pages", () => {
    expect(requestedPage({ page: "3" })).toBe(3);
    expect(requestedPage({ page: ["4", "5"] })).toBe(4);
  });

  it("normalizes unsafe page input", () => {
    expect(requestedPage({})).toBe(1);
    expect(requestedPage({ page: "0" })).toBe(1);
    expect(requestedPage({ page: "2.5" })).toBe(1);
    expect(requestedPage({ page: "not-a-number" })).toBe(1);
  });
});
