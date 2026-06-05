"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

import { episomerAggregatesToJson, episomerDemoAggregates, episomerSchema, summarizeEpisomerAggregates, type EpisomerAggregate, type EpisomerLiveResponse, type EpisomerStatusResponse } from "@/lib/episomer";
import { AppHeader, MiniTabs } from "../page";
import styles from "../page.module.css";

type Language = "pt" | "en";

const sources = [
  {
    href: "https://www.ecdc.europa.eu/en/publications-data/episomer",
    label: "ECDC Episomer",
  },
  {
    href: "https://github.com/EU-ECDC/episomer",
    label: "GitHub EU-ECDC/episomer",
  },
  {
    href: "https://www.ecdc.europa.eu/en/tools/outbreak-surveillance-tools",
    label: "ECDC surveillance tools",
  },
  {
    href: "https://github.com/EU-ECDC/episomer/blob/main/LICENSE",
    label: "EUPL-1.2 license",
  },
] as const;

const copy = {
  pt: {
    eyebrow: "Episomer preview",
    title: "Sinais digitais agregados para revisão epidemiológica",
    intro:
      "Esta página é uma pré-visualização da integração com Episomer. A versão real deve correr num worker R separado, recolher sinais sociais por tópico e devolver apenas agregados por território e período. Esta app não recolhe posts, notícias ou dados pessoais.",
    badges: ["Demo, não live", "Contrato de dados agregado", "Separado da line-list clínica", "Preparado para worker R"],
    topic: "Tópico",
    liveTopic: "Tópico/keywords live",
    liveTopicPlaceholder: "ex.: measles OR sarampo OR outbreak",
    location: "Local",
    all: "Todos",
    export: "Exportar agregados JSON",
    collectLive: "Recolher live 10s",
    collecting: "A recolher...",
    liveResults: "Resultados live",
    liveArticles: "Artigos recolhidos",
    liveFallback: "Ainda sem recolha live nesta sessão.",
    statusTitle: "Estado da integração",
    status: "Estado técnico",
    statusDetail: "A visualização abaixo começa com agregados sintéticos. O botão live executa uma recolha curta de notícias abertas; o modo Episomer social-media real requer worker R, APIs sociais e governação explícita.",
    setupChecks: "Instalação e credenciais",
    governanceChecks: "Governação explícita",
    statusLoading: "A verificar configuração...",
    statusError: "Não foi possível ler o estado da configuração.",
    sourceMode: "Origem dos sinais",
    sourceModeValue: "Amostra demonstrativa",
    sourceModeLive: "Live: Bluesky/social APIs via worker R",
    modelTitle: "Arquitetura alvo",
    model: [
      "Episomer recolhe posts por tópicos/keywords e calcula agregados no ambiente R.",
      "O worker expõe apenas contagens, esperado, limiar, alerta e metadados de execução.",
      "O frontend apresenta os sinais como fila de revisão, sem os converter em casos ou incidência.",
      "A equipa de vigilância valida, contextualiza e decide observar, escalar ou descartar."
    ],
    metrics: {
      rows: "agregados",
      topics: "tópicos",
      locations: "locais",
      alerts: "alertas",
      escalated: "escalados",
      maxScore: "score máx."
    },
    chartTitle: "Volume observado versus limiar",
    tableTitle: "Fila de revisão",
    schemaTitle: "Contrato de dados esperado",
    liveTitle: "Modo live proposto",
    liveItems: [
      "POST /episomer/search: tópico, keywords, território, janela temporal e fonte social.",
      "GET /episomer/status: disponibilidade do R/Episomer, última execução e erros operacionais.",
      "POST /episomer/aggregate: devolve apenas agregados revistos para o dashboard.",
      "Sem raw posts no browser; retenção, anonimização e eliminação ficam no worker."
    ],
    sourcesTitle: "Fontes e licença",
    empty: "Sem agregados para os filtros atuais.",
    note:
      "Amostra demonstrativa. Episomer é social media epidemic intelligence; notícias abertas/EIOS seriam outro conector e devem ter contrato e governação próprios."
  },
  en: {
    eyebrow: "Episomer preview",
    title: "Aggregated digital signals for epidemiological review",
    intro:
      "This page previews the Episomer integration. The real version should run in a separate R worker, collect social signals by topic and return aggregates by territory and period only. This app does not collect posts, news or personal data.",
    badges: ["Demo, not live", "Aggregate data contract", "Separate from clinical line-list", "Ready for an R worker"],
    topic: "Topic",
    liveTopic: "Live topic/keywords",
    liveTopicPlaceholder: "e.g. measles OR outbreak OR pertussis",
    location: "Location",
    all: "All",
    export: "Export aggregates JSON",
    collectLive: "Collect live 10s",
    collecting: "Collecting...",
    liveResults: "Live results",
    liveArticles: "Collected articles",
    liveFallback: "No live collection in this session yet.",
    statusTitle: "Integration status",
    status: "Technical status",
    statusDetail: "The view below starts with synthetic aggregates. The live button runs a short open-news collection; real Episomer social-media mode requires an R worker, social APIs and explicit governance.",
    setupChecks: "Installation and credentials",
    governanceChecks: "Explicit governance",
    statusLoading: "Checking configuration...",
    statusError: "Could not read configuration status.",
    sourceMode: "Signal source",
    sourceModeValue: "Demonstration sample",
    sourceModeLive: "Live: Bluesky/social APIs via R worker",
    modelTitle: "Target architecture",
    model: [
      "Episomer collects posts by topics/keywords and calculates aggregates in the R environment.",
      "The worker exposes only counts, expected volume, threshold, alert status and run metadata.",
      "The frontend presents signals as a review queue without turning them into cases or incidence.",
      "The surveillance team validates, contextualises and decides whether to watch, escalate or dismiss."
    ],
    metrics: {
      rows: "aggregates",
      topics: "topics",
      locations: "locations",
      alerts: "alerts",
      escalated: "escalated",
      maxScore: "max score"
    },
    chartTitle: "Observed volume versus threshold",
    tableTitle: "Review queue",
    schemaTitle: "Expected data contract",
    liveTitle: "Proposed live mode",
    liveItems: [
      "POST /episomer/search: topic, keywords, territory, time window and social source.",
      "GET /episomer/status: R/Episomer availability, latest run and operational errors.",
      "POST /episomer/aggregate: returns reviewed aggregates only for the dashboard.",
      "No raw posts in the browser; retention, anonymisation and deletion stay in the worker."
    ],
    sourcesTitle: "Sources and licence",
    empty: "No aggregates for the current filters.",
    note:
      "Demonstration sample. Episomer is social media epidemic intelligence; open news/EIOS would be a separate connector with its own contract and governance."
  },
} as const;

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function liveRowsToJson(result: EpisomerLiveResponse | null, rows: EpisomerAggregate[]): string {
  if (!result) return episomerAggregatesToJson(rows);
  return JSON.stringify(result, null, 2);
}

function EpisomerContent() {
  const searchParams = useSearchParams();
  const language: Language = searchParams.get("lang") === "en" ? "en" : "pt";
  const t = copy[language];
  const [topic, setTopic] = useState<string>(t.all);
  const [location, setLocation] = useState<string>(t.all);
  const [liveTopic, setLiveTopic] = useState("measles OR pertussis OR outbreak");
  const [liveResult, setLiveResult] = useState<EpisomerLiveResponse | null>(null);
  const [liveProgress, setLiveProgress] = useState(0);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [status, setStatus] = useState<EpisomerStatusResponse | null>(null);
  const [statusError, setStatusError] = useState(false);
  const topics = useMemo(() => [...new Set(episomerDemoAggregates.map((row) => row.topic))], []);
  const locations = useMemo(() => [...new Set(episomerDemoAggregates.map((row) => row.location))], []);
  const activeAggregates = liveResult?.aggregates.length ? liveResult.aggregates : episomerDemoAggregates;
  const activeTopicOptions = useMemo(() => [...new Set(activeAggregates.map((row) => row.topic))], [activeAggregates]);
  const activeLocationOptions = useMemo(() => [...new Set(activeAggregates.map((row) => row.location))], [activeAggregates]);
  const rows = useMemo(
    () => activeAggregates.filter((row) => (topic === t.all || row.topic === topic) && (location === t.all || row.location === location)),
    [activeAggregates, location, t.all, topic]
  );
  const summary = useMemo(() => summarizeEpisomerAggregates(rows), [rows]);
  const chartMax = Math.max(1, ...rows.map((row) => Math.max(row.posts_observed, row.threshold)));

  useEffect(() => {
    let ignore = false;
    fetch("/api/episomer/status", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<EpisomerStatusResponse>;
      })
      .then((payload) => {
        if (!ignore) setStatus(payload);
      })
      .catch(() => {
        if (!ignore) setStatusError(true);
      });
    return () => {
      ignore = true;
    };
  }, []);

  async function collectLiveSignals() {
    setIsCollecting(true);
    setLiveError(null);
    setLiveProgress(0);
    const started = Date.now();
    const timer = window.setInterval(() => {
      setLiveProgress(Math.min(95, Math.round(((Date.now() - started) / 10000) * 100)));
    }, 250);
    try {
      const params = new URLSearchParams({ topic: liveTopic, seconds: "10" });
      const response = await fetch(`/api/episomer/live?${params.toString()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json() as EpisomerLiveResponse;
      setLiveResult(payload);
      setTopic(t.all);
      setLocation(t.all);
      setLiveProgress(100);
    } catch (error) {
      setLiveError(error instanceof Error ? error.message : "Live collection failed");
    } finally {
      window.clearInterval(timer);
      setIsCollecting(false);
    }
  }

  return (
    <main className={styles.page}>
      <AppHeader language={language} languageHref={(nextLanguage) => `/episomer?lang=${nextLanguage}` as Route} />
      <MiniTabs activeSection="somer" language={language} />

      <section className={styles.somerPage} aria-labelledby="episomer-title">
        <article className={styles.somerHero}>
          <p className={styles.somerEyebrow}>{t.eyebrow}</p>
          <h2 id="episomer-title">{t.title}</h2>
          <p>{t.intro}</p>
          <div className={styles.somerBadges}>
            {t.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </article>

        <div className={styles.episomerWorkbench}>
          <div className={styles.episomerMainColumn}>
            <section className={styles.somerPanel} aria-labelledby="episomer-model">
              <div className={styles.panelHeader}>
                <div>
                  <h3 id="episomer-model">{t.statusTitle}</h3>
                  <p className={styles.somerStatusText}>{t.statusDetail}</p>
                </div>
                <button type="button" onClick={() => download(liveResult ? "episignal-live-open-news.json" : "episomer-aggregates-demo.json", liveRowsToJson(liveResult, rows), "application/json")}>
                  {t.export}
                </button>
              </div>
              <div className={styles.somerStatusGrid}>
                <span>
                  <strong>{status?.worker_status ?? t.statusLoading}</strong>
                  <small>{t.status}</small>
                </span>
                <span>
                  <strong>{status?.source_mode ?? t.sourceModeValue}</strong>
                  <small>{t.sourceMode}</small>
                </span>
                <span>
                  <strong>{status?.r_worker_url ? "server-side endpoint configured" : t.sourceModeLive}</strong>
                  <small>{status?.r_worker_url ? "EPISOMER_R_WORKER_URL" : "planned_mode"}</small>
                </span>
              </div>
              {statusError ? <p className={styles.alert}>{t.statusError}</p> : null}
              {status ? (
                <div className={styles.episomerSetupGrid}>
                  <section>
                    <h4>{t.setupChecks}</h4>
                    {status.checks.map((check) => (
                      <span className={check.ready ? styles.episomerReady : styles.episomerMissing} key={check.key}>
                        <strong>{check.ready ? "OK" : "TODO"}</strong>
                        <b>{check.label}</b>
                        <small>{check.detail}</small>
                      </span>
                    ))}
                  </section>
                  <section>
                    <h4>{t.governanceChecks}</h4>
                    {status.governance.map((check) => (
                      <span className={check.ready ? styles.episomerReady : styles.episomerMissing} key={check.key}>
                        <strong>{check.ready ? "OK" : "TODO"}</strong>
                        <b>{check.label}</b>
                      </span>
                    ))}
                  </section>
                </div>
              ) : null}
              <div className={styles.episomerLiveControls}>
                <label>
                  {t.liveTopic}
                  <input
                    value={liveTopic}
                    placeholder={t.liveTopicPlaceholder}
                    onChange={(event) => setLiveTopic(event.target.value)}
                  />
                </label>
                <button type="button" disabled={isCollecting} onClick={collectLiveSignals}>
                  {isCollecting ? t.collecting : t.collectLive}
                </button>
              </div>
              <div className={styles.episomerProgress} aria-label={t.collecting}>
                <span style={{ width: `${liveProgress}%` }} />
              </div>
              {liveError ? <p className={styles.alert}>{liveError}</p> : null}
              {liveResult ? (
                <p className={styles.somerStatusText}>
                  {t.liveResults}: {liveResult.articles.length} artigos, {liveResult.aggregates.length} agregados, {liveResult.seconds_elapsed}s. {liveResult.warning}
                </p>
              ) : (
                <p className={styles.somerStatusText}>{t.liveFallback}</p>
              )}
            </section>

            <section className={styles.somerPanel} aria-labelledby="episomer-architecture">
              <h3 id="episomer-architecture">{t.modelTitle}</h3>
              <ol className={styles.somerFlow}>
                {t.model.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section className={styles.somerPanel} aria-label="Episomer filters">
              <div className={styles.episomerFilters}>
                <label>
                  {t.topic}
                  <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                    <option>{t.all}</option>
                    {(liveResult ? activeTopicOptions : topics).map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  {t.location}
                  <select value={location} onChange={(event) => setLocation(event.target.value)}>
                    <option>{t.all}</option>
                    {(liveResult ? activeLocationOptions : locations).map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
              <div className={styles.episomerMetricGrid}>
                <span><strong>{summary.rows}</strong>{t.metrics.rows}</span>
                <span><strong>{summary.topics}</strong>{t.metrics.topics}</span>
                <span><strong>{summary.locations}</strong>{t.metrics.locations}</span>
                <span><strong>{summary.alerts}</strong>{t.metrics.alerts}</span>
                <span><strong>{summary.escalated}</strong>{t.metrics.escalated}</span>
                <span><strong>{summary.maxScore.toFixed(2)}</strong>{t.metrics.maxScore}</span>
              </div>
            </section>

            <section className={styles.somerGrid}>
              <article className={styles.somerCard}>
                <h3>{t.chartTitle}</h3>
                {rows.length ? (
                  <div className={styles.episomerBars}>
                    {rows.map((row) => (
                      <div className={styles.episomerBarRow} key={`${row.topic}-${row.location}-${row.date}`}>
                        <span>{row.topic} · {row.location}</span>
                        <div className={styles.episomerBarTrack}>
                          <b style={{ width: `${Math.max(3, (row.posts_observed / chartMax) * 100)}%` }} />
                          <i style={{ left: `${Math.min(100, (row.threshold / chartMax) * 100)}%` }} />
                        </div>
                        <em>{row.posts_observed}/{row.threshold}</em>
                      </div>
                    ))}
                  </div>
                ) : <p>{t.empty}</p>}
              </article>

              <article className={styles.somerCard}>
                <h3>{t.tableTitle}</h3>
                <div className={styles.episomerTableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>topic</th>
                        <th>location</th>
                        <th>date</th>
                        <th>observed</th>
                        <th>alert</th>
                        <th>review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={`${row.topic}-${row.location}-${row.date}`}>
                          <td>{row.topic}</td>
                          <td>{row.location}</td>
                          <td>{row.date}</td>
                          <td>{row.posts_observed}</td>
                          <td>{row.alert ? "yes" : "no"}</td>
                          <td>{row.review_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </section>
          </div>

          <aside className={styles.episomerArticleAside} aria-labelledby="episomer-live-articles">
            <h3 id="episomer-live-articles">{t.liveArticles}</h3>
            {liveResult ? (
              <div className={styles.episomerArticleList}>
                {liveResult.articles.map((article) => (
                  <article key={article.url}>
                    <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
                    <span>{article.source_domain || article.source_country} · {article.language || "n/a"} · {article.seen_at || liveResult.generated_at}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.somerStatusText}>{t.liveFallback}</p>
            )}
          </aside>
        </div>

        <section className={styles.somerPanel} aria-labelledby="episomer-schema">
          <h3 id="episomer-schema">{t.schemaTitle}</h3>
          <div className={styles.episomerSchemaGrid}>
            {episomerSchema.map((field) => (
              <article key={field.field}>
                <strong>{field.field}</strong>
                <span>{field.type}{field.required ? " · required" : ""}</span>
                <p>{field.definition}</p>
              </article>
            ))}
          </div>
          <p className={styles.mapSource}>{t.note}</p>
        </section>

        <section className={styles.somerPanel} aria-labelledby="episomer-live">
          <h3 id="episomer-live">{t.liveTitle}</h3>
          <ol className={styles.somerFlow}>
            {t.liveItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section className={styles.somerPanel} aria-labelledby="episomer-sources">
          <h3 id="episomer-sources">{t.sourcesTitle}</h3>
          <div className={styles.somerSources}>
            {sources.map((source) => (
              <Link href={source.href} key={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default function EpisomerPage() {
  return (
    <Suspense fallback={null}>
      <EpisomerContent />
    </Suspense>
  );
}
