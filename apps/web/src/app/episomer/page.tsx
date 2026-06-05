"use client";

import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import { episomerAggregatesToJson, episomerDemoAggregates, episomerSchema, summarizeEpisomerAggregates } from "@/lib/episomer";
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
    location: "Local",
    all: "Todos",
    export: "Exportar agregados JSON",
    statusTitle: "Estado da integração",
    status: "Worker Episomer não ligado",
    statusDetail: "A visualização abaixo usa agregados sintéticos. O modo live requer instalação/configuração de Episomer, credenciais das APIs sociais e governação explícita.",
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
    chartTitle: "Volume demo observado versus limiar",
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
    location: "Location",
    all: "All",
    export: "Export aggregates JSON",
    statusTitle: "Integration status",
    status: "Episomer worker not connected",
    statusDetail: "The view below uses synthetic aggregates. Live mode requires Episomer installation/configuration, social API credentials and explicit governance.",
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
    chartTitle: "Demo observed volume versus threshold",
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

function EpisomerContent() {
  const searchParams = useSearchParams();
  const language: Language = searchParams.get("lang") === "en" ? "en" : "pt";
  const t = copy[language];
  const [topic, setTopic] = useState<string>(t.all);
  const [location, setLocation] = useState<string>(t.all);
  const topics = useMemo(() => [...new Set(episomerDemoAggregates.map((row) => row.topic))], []);
  const locations = useMemo(() => [...new Set(episomerDemoAggregates.map((row) => row.location))], []);
  const rows = useMemo(
    () => episomerDemoAggregates.filter((row) => (topic === t.all || row.topic === topic) && (location === t.all || row.location === location)),
    [location, t.all, topic]
  );
  const summary = useMemo(() => summarizeEpisomerAggregates(rows), [rows]);
  const chartMax = Math.max(1, ...rows.map((row) => Math.max(row.posts_observed, row.threshold)));

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

        <section className={styles.somerPanel} aria-labelledby="episomer-model">
          <div className={styles.panelHeader}>
            <div>
              <h3 id="episomer-model">{t.statusTitle}</h3>
              <p className={styles.somerStatusText}>{t.statusDetail}</p>
            </div>
            <button type="button" onClick={() => download("episomer-aggregates-demo.json", episomerAggregatesToJson(rows), "application/json")}>
              {t.export}
            </button>
          </div>
          <div className={styles.somerStatusGrid}>
            <span>
              <strong>{t.status}</strong>
              <small>worker_status=offline</small>
            </span>
            <span>
              <strong>{t.sourceModeValue}</strong>
              <small>{t.sourceMode}</small>
            </span>
            <span>
              <strong>{t.sourceModeLive}</strong>
              <small>planned_mode</small>
            </span>
          </div>
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
                {topics.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              {t.location}
              <select value={location} onChange={(event) => setLocation(event.target.value)}>
                <option>{t.all}</option>
                {locations.map((item) => <option key={item}>{item}</option>)}
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
