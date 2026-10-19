import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DashboardAuth, getStoredDemoProfile } from "@/components/dashboard-auth";

function renderAuth(onDemoStarted = vi.fn()) {
  render(
    <MemoryRouter>
      <DashboardAuth onDemoStarted={onDemoStarted} />
    </MemoryRouter>,
  );
  return onDemoStarted;
}

function openCodeStep() {
  fireEvent.change(screen.getByLabelText(/sample phone or email/i), { target: { value: "demo@example.test" } });
  fireEvent.click(screen.getByRole("button", { name: /continue to demo code/i }));
}

afterEach(() => vi.useRealTimers());

describe("Dashboard access demonstration", () => {
  it("states the security boundary before collecting demo details", () => {
    renderAuth();
    expect(screen.getByRole("note")).toHaveTextContent(/creates no account/i);
    expect(screen.getByRole("note")).toHaveTextContent(/verifies no identity/i);
    expect(screen.getByText(/do not enter real personal/i)).toBeInTheDocument();
  });

  it("makes clear that no message is sent", () => {
    renderAuth();
    openCodeStep();
    expect(screen.getByText(/no message was sent/i)).toBeInTheDocument();
    expect(screen.getByText("265265")).toBeInTheDocument();
  });

  it("accepts the published demo code without creating a credential", () => {
    vi.useFakeTimers();
    const onDemoStarted = renderAuth();
    openCodeStep();

    fireEvent.click(screen.getByRole("button", { name: /auto-fill code/i }));
    act(() => vi.advanceTimersByTime(1_100));

    expect(onDemoStarted).toHaveBeenCalledOnce();
    const profile = onDemoStarted.mock.calls[0][0];
    expect(profile).not.toHaveProperty("token");
    expect(profile.demoChannel).toBe("sms");
    expect(getStoredDemoProfile()).toMatchObject({ email: "demo@example.test", role: "supporter" });
    expect(localStorage.getItem("m265-auth-session")).toBeNull();
  });
});
