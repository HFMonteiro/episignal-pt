import { NextResponse } from "next/server";

import type { EpisomerGovernanceCheck, EpisomerReadinessState, EpisomerSetupCheck, EpisomerStatusResponse } from "@/lib/episomer";
import { resolveEpisomerReadiness } from "@/lib/episomerStatus";

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
      key: "rss_sources",
      label: "Fontes RSS públicas",
      ready: true,
      detail: "Google News RSS está ativo para recolha curta de evidência pública aberta."
    },
    {
      key: "r_worker",
      label: "Worker R (opcional)",
      ready: Boolean(rWorkerUrl),
      detail: rWorkerUrl ? "Configurado para extensão futura" : "Não configurado; não necessário para o modo RSS"
    },
    {
      key: "topic_config",
      label: "Plano de tópicos",
      ready: isSet("EPISOMER_TOPIC_CONFIG_PATH"),
      detail: "Set EPISOMER_TOPIC_CONFIG_PATH para a configuração de tópicos por ambiente"
    }
  ];

  const governance: EpisomerGovernanceCheck[] = [
    { key: "data_protection_basis", label: "Base legal de proteção de dados documentada", ready: flagEnabled("EPISOMER_GOV_DATA_PROTECTION_BASIS") },
    { key: "retention_policy", label: "Política de retenção/eliminação aprovada", ready: flagEnabled("EPISOMER_GOV_RETENTION_POLICY") },
    { key: "human_review", label: "Fluxo de revisão humana atribuído", ready: flagEnabled("EPISOMER_GOV_HUMAN_REVIEW") },
    { key: "audit_log", label: "Registo de auditoria ativo", ready: flagEnabled("EPISOMER_GOV_AUDIT_LOG") }
  ];

  const requiredReady = checks.filter((check) => check.key !== "r_worker").every((check) => check.ready);
  const governanceReady = governance.every((check) => check.ready);
  const readinessState: EpisomerReadinessState = resolveEpisomerReadiness({
    rssReady: checks.some((check) => check.key === "rss_sources" && check.ready),
    topicConfigReady: checks.some((check) => check.key === "topic_config" && check.ready),
    rWorkerReady: Boolean(rWorkerUrl),
    governanceReady
  });

  const response: EpisomerStatusResponse = {
    worker_status: readinessState === "production_ready" ? "ready" : "partial",
    source_mode: "open_news_only",
    readiness_state: readinessState,
    r_worker_url: rWorkerUrl,
    checks,
    governance,
    required_env: [
      "EPISOMER_R_WORKER_URL",
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
