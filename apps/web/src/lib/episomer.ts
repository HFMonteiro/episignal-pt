export type EpisomerReviewStatus = "new" | "watch" | "escalated" | "dismissed";
export type EpisomerEvidenceMode = "demo" | "rss_preview" | "worker_output";
export type EpisomerReadinessState = "demo_ready" | "preview_ready" | "production_blocked" | "production_ready";

export type EpisomerAggregate = {
  topic: string;
  location: string;
  date: string;
  posts_observed: number;
  posts_expected: number;
  threshold: number;
  alert: boolean;
  review_status: EpisomerReviewStatus;
  source: "Demo" | "OpenNews";
  evidence_mode: EpisomerEvidenceMode;
  geolocation_quality: "high" | "medium" | "low";
  signal_score: number;
};

export type EpisomerLiveArticle = {
  title: string;
  url: string;
  source_domain: string;
  source_country: string;
  language: string;
  seen_at: string;
};

export type EpisomerLiveResponse = {
  mode: "open_news_live";
  source: "GoogleNewsRSS";
  fetched_at: string;
  topic: string;
  query: string;
  total_items: number;
  unique_items: number;
  duplicate_items: number;
  empty_reason: string | null;
  rss_status: "ok" | "empty" | "error";
  seconds_requested: number;
  seconds_elapsed: number;
  generated_at: string;
  warning: string;
  aggregates: EpisomerAggregate[];
  articles: EpisomerLiveArticle[];
};

export type EpisomerSetupCheck = {
  key: string;
  label: string;
  ready: boolean;
  detail: string;
};

export type EpisomerGovernanceCheck = {
  key: string;
  label: string;
  ready: boolean;
};

export type EpisomerStatusResponse = {
  worker_status: "ready" | "partial" | "offline";
  source_mode: "open_news_only" | "demo";
  readiness_state: EpisomerReadinessState;
  r_worker_url: string | null;
  checks: EpisomerSetupCheck[];
  governance: EpisomerGovernanceCheck[];
  required_env: string[];
  secrets_redacted: true;
  updated_at: string;
};

export type EpisomerField = {
  field: keyof EpisomerAggregate;
  type: string;
  required: boolean;
  definition: string;
};

export const episomerSchema: EpisomerField[] = [
  {
    field: "topic",
    type: "string",
    required: true,
    definition: "Disease, syndrome, hazard or monitored keyword group."
  },
  {
    field: "location",
    type: "string",
    required: true,
    definition: "Geographic aggregation used for review; not a case residence field."
  },
  {
    field: "date",
    type: "date",
    required: true,
    definition: "Daily or weekly period represented by the aggregate."
  },
  {
    field: "posts_observed",
    type: "number",
    required: true,
    definition: "Number of posts retained after collection, deduplication and filtering."
  },
  {
    field: "posts_expected",
    type: "number",
    required: true,
    definition: "Expected post volume. In RSS preview mode this is an approximate baseline, not a validated epidemiological threshold."
  },
  {
    field: "threshold",
    type: "number",
    required: true,
    definition: "Upper alert threshold. In RSS preview mode this is an approximate review trigger, not an operational outbreak threshold."
  },
  {
    field: "alert",
    type: "boolean",
    required: true,
    definition: "Whether observed volume exceeds the configured digital signal threshold."
  },
  {
    field: "review_status",
    type: "enum",
    required: true,
    definition: "Human review status: new, watch, escalated or dismissed."
  },
  {
    field: "source",
    type: "enum",
    required: true,
    definition: "Collection source used to generate the aggregate."
  },
  {
    field: "evidence_mode",
    type: "enum",
    required: true,
    definition: "Evidence tier: demo, rss_preview or worker_output. Only worker_output can represent a future validated backend."
  },
  {
    field: "geolocation_quality",
    type: "enum",
    required: true,
    definition: "Confidence tier for location assignment."
  },
  {
    field: "signal_score",
    type: "number",
    required: true,
    definition: "Relative score used for sorting review workload; not a clinical risk score."
  }
];

export const episomerDemoAggregates: EpisomerAggregate[] = [
  { topic: "Pertussis", location: "Porto", date: "2024-03-04", posts_observed: 22, posts_expected: 12, threshold: 19, alert: true, review_status: "watch", source: "Demo", evidence_mode: "demo", geolocation_quality: "high", signal_score: 0.78 },
  { topic: "Pertussis", location: "Porto", date: "2024-03-11", posts_observed: 34, posts_expected: 13, threshold: 20, alert: true, review_status: "escalated", source: "Demo", evidence_mode: "demo", geolocation_quality: "high", signal_score: 0.91 },
  { topic: "Pertussis", location: "Lisboa", date: "2024-03-11", posts_observed: 18, posts_expected: 15, threshold: 24, alert: false, review_status: "watch", source: "Demo", evidence_mode: "demo", geolocation_quality: "medium", signal_score: 0.42 },
  { topic: "Pertussis", location: "Coimbra", date: "2024-03-11", posts_observed: 9, posts_expected: 8, threshold: 15, alert: false, review_status: "new", source: "Demo", evidence_mode: "demo", geolocation_quality: "medium", signal_score: 0.25 },
  { topic: "Measles", location: "Faro", date: "2024-03-04", posts_observed: 14, posts_expected: 6, threshold: 11, alert: true, review_status: "watch", source: "Demo", evidence_mode: "demo", geolocation_quality: "high", signal_score: 0.83 },
  { topic: "Measles", location: "Faro", date: "2024-03-11", posts_observed: 21, posts_expected: 7, threshold: 12, alert: true, review_status: "escalated", source: "Demo", evidence_mode: "demo", geolocation_quality: "high", signal_score: 0.94 },
  { topic: "Measles", location: "Beja", date: "2024-03-11", posts_observed: 6, posts_expected: 5, threshold: 10, alert: false, review_status: "new", source: "Demo", evidence_mode: "demo", geolocation_quality: "low", signal_score: 0.18 },
  { topic: "Respiratory symptoms", location: "Lisboa", date: "2024-03-04", posts_observed: 47, posts_expected: 41, threshold: 62, alert: false, review_status: "new", source: "Demo", evidence_mode: "demo", geolocation_quality: "medium", signal_score: 0.33 },
  { topic: "Respiratory symptoms", location: "Porto", date: "2024-03-11", posts_observed: 58, posts_expected: 45, threshold: 67, alert: false, review_status: "watch", source: "Demo", evidence_mode: "demo", geolocation_quality: "medium", signal_score: 0.46 }
];

export function summarizeEpisomerAggregates(rows: EpisomerAggregate[]) {
  const alerts = rows.filter((row) => row.alert);
  return {
    rows: rows.length,
    topics: new Set(rows.map((row) => row.topic)).size,
    locations: new Set(rows.map((row) => row.location)).size,
    alerts: alerts.length,
    escalated: rows.filter((row) => row.review_status === "escalated").length,
    maxScore: rows.reduce((max, row) => Math.max(max, row.signal_score), 0)
  };
}

export function episomerAggregatesToJson(rows: EpisomerAggregate[]): string {
  return JSON.stringify(
    {
      source: "episignal-pt demonstration sample",
      upstream: "https://github.com/EU-ECDC/episomer",
      worker_status: "offline",
      live_collection: false,
      contract: "topic/location/date/posts_observed/posts_expected/threshold/alert/review_status/evidence_mode",
      note: "Synthetic aggregates only. Open-news RSS collection is optional, and no raw article contents or personal data are stored in the browser.",
      rows
    },
    null,
    2
  );
}
