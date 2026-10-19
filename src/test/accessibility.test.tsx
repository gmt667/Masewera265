import axe from "axe-core";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { DashboardAuth } from "@/components/dashboard-auth";
import { SiteHeader } from "@/components/site-header";

async function expectNoAccessibilityViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    rules: {
      // jsdom has no layout engine, so contrast must be checked in a real browser.
      "color-contrast": { enabled: false },
    },
  });

  expect(
    results.violations.map(({ id, help, nodes }) => ({
      id,
      help,
      targets: nodes.flatMap((node) => node.target),
    })),
  ).toEqual([]);
}

describe("automated accessibility checks", () => {
  it("finds no structural violations in the dashboard access demonstration", async () => {
    const { container } = render(
      <MemoryRouter>
        <main>
          <DashboardAuth onDemoStarted={() => undefined} />
        </main>
      </MemoryRouter>,
    );

    await expectNoAccessibilityViolations(container);
  });

  it("finds no structural violations in the public navigation", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/sports"]}>
        <SiteHeader />
        <main id="main"><h1>Sports</h1></main>
      </MemoryRouter>,
    );

    await expectNoAccessibilityViolations(container);
  });
});
