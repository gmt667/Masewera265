import { athletes, competitions, events, sports, teams, articles } from "./demo-data";

export type DataMode = "demo" | "connected";
export const dataMode: DataMode = process.env.NEXT_PUBLIC_DATA_MODE === "connected" ? "connected" : "demo";

export const publicData = {
  sports: async () => sports,
  events: async () => events,
  competitions: async () => competitions,
  teams: async () => teams,
  athletes: async () => athletes,
  news: async () => articles,
};

export const connectedDataAvailable = dataMode === "connected" && Boolean(process.env.MASEWERA265_API_BASE_URL);

export function assertPublicDataMode() {
  if (dataMode === "connected" && !connectedDataAvailable) {
    throw new Error("Connected data requested, but no approved Masewera265 API endpoint is configured.");
  }
}
