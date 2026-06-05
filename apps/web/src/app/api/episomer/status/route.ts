import { NextResponse } from "next/server";

import type { EpisomerGovernanceCheck, EpisomerSetupCheck, EpisomerStatusResponse } from "@/lib/episomer";

export const dynamic = "force-dynamic";

function isSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function flagEnabled(name: string): boolean {
  return ["1", "true", "yes", "ready"].includes((process.env[name] ?? "").trim().toLowerCase());
}

export async function GET() {
  const rWorkerUrl = process.env.EPISOMER_R_WORKER_URL?.trim() || null;
  const checks: EpisomerSetupCheck[] = [
    {
      key: "r_worker",
      label: "R worker endpoint",
      ready: Boolean(rWorkerUrl),
      detail: rWorkerUrl ? "Configured server-side" : "Set EPISOMER_R_WORKER_URL"
    },
    {
      key: "episomer_package",
      label: "Episomer R package",
      ready: flagEnabled("EPISOMER_PACKAGE_READY"),
      detail: "Install with install.packages('episomer', repos = c('https://eu-ecdc.r-universe.dev', 'https://cloud.r-project.org'))"
    },
    {
      key: "bluesky_credentials",
      label: "Bluesky credentials",
      ready: isSet("BLUESKY_IDENTIFIER") && isSet("BLUESKY_APP_PASSWORD"),
      detail: "Set BLUESKY_IDENTIFIER and BLUESKY_APP_PASSWORD in server environment only"
    },
    {
      key: "topic_config",
      label: "Topic and keyword plan",
      ready: isSet("EPISOMER_TOPIC_CONFIG_PATH"),
      detail: "Set EPISOMER_TOPIC_CONFIG_PATH to the reviewed topic/keyword configuration"
    }
  ];

  const governance: EpisomerGovernanceCheck[] = [
    { key: "data_protection_basis", label: "Data protection basis documented", ready: flagEnabled("EPISOMER_GOV_DATA_PROTECTION_BASIS") },
    { key: "retention_policy", label: "Retention/deletion policy approved", ready: flagEnabled("EPISOMER_GOV_RETENTION_POLICY") },
    { key: "human_review", label: "Human review workflow assigned", ready: flagEnabled("EPISOMER_GOV_HUMAN_REVIEW") },
    { key: "audit_log", label: "Audit logging enabled", ready: flagEnabled("EPISOMER_GOV_AUDIT_LOG") }
  ];

  const requiredReady = checks.every((check) => check.ready);
  const governanceReady = governance.every((check) => check.ready);
  const response: EpisomerStatusResponse = {
    worker_status: requiredReady && governanceReady ? "ready" : checks.some((check) => check.ready) || governance.some((check) => check.ready) ? "partial" : "offline",
    source_mode: requiredReady && governanceReady ? "episomer_bluesky" : rWorkerUrl ? "open_news_only" : "demo",
    r_worker_url: rWorkerUrl,
    checks,
    governance,
    required_env: [
      "EPISOMER_R_WORKER_URL",
      "EPISOMER_PACKAGE_READY",
      "BLUESKY_IDENTIFIER",
      "BLUESKY_APP_PASSWORD",
      "EPISOMER_TOPIC_CONFIG_PATH",
      "EPISOMER_GOV_DATA_PROTECTION_BASIS",
      "EPISOMER_GOV_RETENTION_POLICY",
      "EPISOMER_GOV_HUMAN_REVIEW",
      "EPISOMER_GOV_AUDIT_LOG"
    ],
    secrets_redacted: true,
    updated_at: new Date().toISOString()
  };

  return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
}
