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
    eyebrow: "Integração Episomer",
    title: "Sinais sociais agregados para revisão epidemiológica",
    intro:
      "Esta página mostra como o episignal-pt deve receber resultados do Episomer: apenas agregados por tópico, território e período. Não há recolha de posts nesta app e estes sinais não entram como casos ou incidência.",
    badges: ["Contrato de dados agregado", "Separado da line-list clínica", "Preparado para worker R"],
    topic: "Tópico",
    location: "Local",
    all: "Todos",
    export: "Exportar agregados JSON",
    modelTitle: "Modelo de integração",
    model: [
      "Episomer recolhe e classifica posts no seu ambiente R/Shiny.",
      "O worker devolve apenas contagens agregadas, esperado, limiar e estado de alerta.",
      "A app mostra esses sinais como fila de revisão, sem os misturar com casos notificados.",
      "A revisão humana decide observar, escalar ou descartar antes de qualquer ação."
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
    sourcesTitle: "Fontes e licença",
    empty: "Sem agregados para os filtros atuais.",
    note:
      "Amostra demonstrativa. Em produção, estes campos devem vir de um worker R que execute Episomer e aplique governação de dados sociais."
  },
  en: {
    eyebrow: "Episomer integration",
    title: "Aggregated social signals for epidemiological review",
    intro:
      "This page shows how episignal-pt should receive Episomer outputs: aggregates by topic, territory and period only. This app does not collect posts, and these signals are not cases or incidence.",
    badges: ["Aggregate data contract", "Separate from clinical line-list", "Ready for an R worker"],
    topic: "Topic",
    location: "Location",
    all: "All",
    export: "Export aggregates JSON",
    modelTitle: "Integration model",
    model: [
      "Episomer collects and classifies posts in its R/Shiny environment.",
      "The worker returns only aggregated counts, expected volume, threshold and alert status.",
      "The app shows those signals as a review queue without mixing them with notified cases.",
      "Human review decides whether to watch, escalate or dismiss before action."
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
    sourcesTitle: "Sources and licence",
    empty: "No aggregates for the current filters.",
    note:
      "Demonstration sample. In production, these fields should come from an R worker running Episomer with social-data governance."
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
            <h3 id="episomer-model">{t.modelTitle}</h3>
            <button type="button" onClick={() => download("episomer-aggregates-demo.json", episomerAggregatesToJson(rows), "application/json")}>
              {t.export}
            </button>
          </div>
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
