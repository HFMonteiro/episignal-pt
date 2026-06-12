import type { EpisomerReadinessState } from "./episomer";

export function resolveEpisomerReadiness(input: {
  rssReady: boolean;
  topicConfigReady: boolean;
  rWorkerReady: boolean;
  governanceReady: boolean;
}): EpisomerReadinessState {
  if (!input.rssReady) return "demo_ready";
  if (input.rWorkerReady && input.topicConfigReady && input.governanceReady) return "production_ready";
  if (input.rWorkerReady) return "production_blocked";
  if (input.rssReady) return "preview_ready";
  return "demo_ready";
}
