"use client";

import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  makeDemoCases,
  parseCsv,
  resolveCrudeDenominator,
  runDemoModel,
  summarize,
  toCsv,
  validateCases
} from "@/lib/demo";
import { expectedFields } from "@/lib/reference";
import { isSupabaseConfigured } from "@/lib/supabase";
import { portugalDistrictShapes } from "@/lib/ptDistrictMap";
import { portugalMunicipalityMapMeta, portugalMunicipalityShapesByDistrict, type MunicipalityMapShape } from "@/lib/ptMunicipalityMap";
import { syntheticMunicipalitiesByDistrict } from "@/lib/ptMunicipalities";
import type { CaseRecord, WeeklyResult } from "@/lib/types";
import styles from "./page.module.css";

type StratumItem = {
  label: string;
  cases: number;
  signals: number;
  signal: boolean;
};

type SectionKey = "data" | "input" | "signals" | "report";
type Language = "pt" | "en";

type NavTab =
  | { label: string; icon: string; href: "/background" }
  | { label: string; icon: string; section: SectionKey };

type StrataKey = "district" | "age_group" | "sex";
type MapLevel = "district" | "municipality";
type MapPan = { x: number; y: number };

const copy = {
  pt: {
    subtitle: "Protótipo de vigilância epidemiológica",
    badges: ["Dataset PT sintético", "Deteção de sinais epidemiológicos", "Sem dados reais de saúde"],
    tabs: {
      help: "Ajuda",
      data: "Dados",
      input: "Parâmetros",
      signals: "Sinais",
      report: "Relatório"
    },
    metrics: {
      method: "Método, doença e período",
      cases: "Casos e alarmes não estratificados",
      strata: "Estratos com flag sintética"
    },
    labels: {
      algorithm: "Algoritmo",
      disease: "Doença",
      period: "Janela de deteção",
      cases: "Casos",
      population: "Denominador usado nos filtros",
      ratePer100k: "Taxa bruta por 100 mil",
      alarms: "Alarmes",
      dataFile: "Ficheiro de dados",
      pathogen: "Agente/doença",
      district: "Filtro por distrito",
      municipality: "Filtro por concelho",
      sex: "Filtro por sexo",
      dateFrom: "Data inicial",
      dateTo: "Data final",
      weeks: "Número de semanas",
      method: "Algoritmo de deteção",
      alpha: "p-value cutoff",
      minCases: "Mínimo de casos por sinal",
      toggle: "Mostrar/ocultar número de sinais nos gráficos estratificados",
      all: "Todos",
      allPathogens: "Todos os agentes"
    },
    actions: {
      run: "Executar deteção",
      sample: "Carregar amostra PT",
      export: "Exportar JSON",
      createReport: "Criar artefacto de relatório",
      downloadSample: "Descarregar CSV da amostra PT"
    },
    messages: {
      loaded: "Lista sintética portuguesa carregada para teste da app: 220 semanas ISO, 2 agentes, 18 distritos e alarmes sintéticos. Não inclui dados reais de saúde.",
      loadedShort: "Lista sintética portuguesa carregada para teste da app: 220 semanas ISO, 2 agentes, 18 distritos e alarmes sintéticos.",
      fixErrors: "Corrige os erros de validação antes de executar a deteção.",
      strata: "Seleciona até 3 variáveis. A seleção atual alimenta o dashboard de Sinais.",
      prototype: "O protótipo atual calcula um limiar semanal demonstrativo. As taxas brutas por 100 mil só são mostradas quando existe um denominador explícito e adequado; uploads sem tabela populacional ficam em contagens. FarringtonFlexible e GLM são servidos pelo R bridge local; EARS e CUSUM permanecem protótipos nativos pendentes de reforço operacional.",
      description: "Visualizações e/ou tabelas com o número de casos e, quando disponível, a taxa bruta por 100 mil calculada com um denominador explícito para os estratos selecionados: distrito, age_group e sex."
    },
    strata: {
      title: "Estratos",
      district: "Distrito",
      age_group: "Grupo etário",
      sex: "Sexo"
    },
    signalCountMode: {
      show: "Mostrar flags sintéticas",
      hide: "Ocultar flags sintéticas"
    },
    methodHint: {
      prefix: "Semanas históricas para ajuste",
      possible: "Métodos possíveis",
      none: "nenhum"
    },
    chartControls: {
      title: "Controlos dos gráficos",
      timeWindow: "Semanas visíveis na série temporal",
      strataZoom: "Zoom visual dos estratos",
      mapZoom: "Zoom visual do mapa",
      reset: "Repor zoom",
      pan: "Mover mapa",
      panUp: "Mover para cima",
      panDown: "Mover para baixo",
      panLeft: "Mover para a esquerda",
      panRight: "Mover para a direita",
      panUpShort: "Cima",
      panDownShort: "Baixo",
      panLeftShort: "Esq.",
      panRightShort: "Dir."
    },
    mapDrilldown: {
      districtTitle: "Casos por distrito",
      ariaLabel: "Mapa SVG de distritos de Portugal com intensidade de casos e sinais",
      zeroCases: "0 casos",
      cases: "casos",
      low: "baixo",
      medium: "médio",
      high: "alto",
      flagged: "com flag",
      signalFlag: "Flag sintética de surto",
      source: "Geometria distrital adaptada do SVG público Wikimedia Commons Portuguese Districts Map With Names.",
      hint: "Clique num distrito para ver concelhos sintéticos.",
      back: "Voltar a distritos",
      title: "Casos por concelho",
      filterLabel: "Filtro por concelho",
      filterAction: "Filtrar",
      officialSource: "Geometria concelhia: DGT CAOP2025 Continente, simplificada para visualização web.",
      breadcrumb: "Portugal -> {district} -> concelhos",
      empty: "Sem dados concelhios para este distrito nos filtros atuais."
    },
    dataPanel: {
      load: "Carregar dados",
      checks: "Resultados da validação",
      unused: "Colunas não usadas diretamente",
      quality: "Qualidade dos dados",
      uploaded: "Dados carregados",
      structure: "Estrutura esperada do dataset",
      rowsLoaded: "linhas carregadas",
      rowsAfterFilters: "linhas após os filtros atuais",
      mandatoryPass: "Todos os campos obrigatórios passam as verificações atuais do protótipo.",
      noneDetected: "Nenhuma detetada.",
      missingMandatory: "Linhas com campos obrigatórios em falta",
      missingAge: "idade/age_group em falta",
      negativeAges: "idades negativas",
      structureIntro: "Esta versão aceita uma line-list CSV de casos e agrega-a por semanas ISO. As taxas brutas só são mostradas quando existe uma fonte de denominador suportada para os filtros selecionados; line-lists de casos carregadas isoladamente ficam apenas em contagens. FarringtonFlexible e GLM são encaminhados pelo R bridge local, enquanto EARS e CUSUM permanecem protótipos nativos.",
      field: "Campo",
      required: "Obrigatório",
      type: "Tipo",
      definition: "Definição"
    },
    report: {
      weekly: "Output semanal de sinais",
      download: "Descarregar relatório",
      title: "Título do relatório",
      format: "Formato",
      includeTables: "Incluir tabelas de sinais por estrato",
      none: "Nenhum",
      minDate: "mín",
      maxDate: "máx",
      scopePrefix: "Âmbito",
      stratifiedBy: "estratificado por",
      method: "Método",
      denominator: "Denominadores/taxas",
      denominatorText: "as taxas brutas por 100 mil só são mostradas quando os filtros do numerador e o âmbito do denominador são explícitos; line-lists carregadas isoladamente ficam apenas em contagens.",
      prototypeLimits: "Limites do protótipo",
      prototypeText: "FarringtonFlexible e GLM são servidos pelo R bridge local; EARS e CUSUM permanecem protótipos nativos.",
      currentFilters: "Filtros atuais",
      district: "distrito",
      municipality: "concelho",
      sex: "sexo",
      dates: "datas"
    }
  },
  en: {
    subtitle: "Epidemiological surveillance prototype",
    badges: ["Synthetic PT dataset", "Epidemiological signal detection", "No real health data"],
    tabs: {
      help: "Help",
      data: "Data",
      input: "Input parameters",
      signals: "Signals",
      report: "Report"
    },
    metrics: {
      method: "Method, disease and period",
      cases: "Unstratified cases and alarms",
      strata: "Synthetic flagged strata"
    },
    labels: {
      algorithm: "Algorithm",
      disease: "Disease",
      period: "Detection window",
      cases: "Cases",
      population: "Denominator used for filters",
      ratePer100k: "Crude rate per 100k",
      alarms: "Alarms",
      dataFile: "Data file",
      pathogen: "Pathogen",
      district: "District filter",
      municipality: "Municipality filter",
      sex: "Sex filter",
      dateFrom: "Date from",
      dateTo: "Date to",
      weeks: "Number of weeks",
      method: "Signal detection algorithm",
      alpha: "p-value cutoff",
      minCases: "Minimum cases per signal",
      toggle: "Toggle number of signals on / off on stratification graphs",
      all: "All",
      allPathogens: "All pathogens"
    },
    actions: {
      run: "Run detection",
      sample: "Load PT sample",
      export: "Export JSON",
      createReport: "Create report artifact",
      downloadSample: "Download PT sample CSV"
    },
    messages: {
      loaded: "Portuguese synthetic line-list loaded for app testing: 220 ISO weeks, 2 pathogens, 18 districts and synthetic alarms. No real health data is included.",
      loadedShort: "Portuguese synthetic line-list loaded for app testing: 220 ISO weeks, 2 pathogens, 18 districts and synthetic alarms.",
      fixErrors: "Fix validation errors before running detection.",
      strata: "Select up to 3 variables. Current selection drives the Signals dashboard.",
      prototype: "Current prototype computes a demo weekly threshold. Crude rates per 100k are only shown when an explicit denominator is available; uploads without a population table remain counts-only. FarringtonFlexible and GLM are served through the local R bridge; EARS and CUSUM remain native prototypes pending further operational hardening.",
      description: "Visualisations and/or tables showing the number of cases and, when available, the crude rate per 100k computed with an explicit denominator for the selected strata: district, age_group and sex."
    },
    strata: {
      title: "Strata",
      district: "District",
      age_group: "Age group",
      sex: "Sex"
    },
    signalCountMode: {
      show: "Show synthetic flags",
      hide: "Hide synthetic flags"
    },
    methodHint: {
      prefix: "Historic fitting weeks",
      possible: "Possible methods",
      none: "none"
    },
    chartControls: {
      title: "Chart controls",
      timeWindow: "Visible weeks in time series",
      strataZoom: "Visual zoom for strata",
      mapZoom: "Visual map zoom",
      reset: "Reset zoom",
      pan: "Move map",
      panUp: "Move up",
      panDown: "Move down",
      panLeft: "Move left",
      panRight: "Move right",
      panUpShort: "Up",
      panDownShort: "Down",
      panLeftShort: "Left",
      panRightShort: "Right"
    },
    mapDrilldown: {
      districtTitle: "Cases by district",
      ariaLabel: "Portugal district SVG map with case intensity and signals",
      zeroCases: "0 cases",
      cases: "cases",
      low: "low",
      medium: "medium",
      high: "high",
      flagged: "flagged",
      signalFlag: "Synthetic outbreak flag",
      source: "District geometry adapted from the public-domain Wikimedia Commons SVG Portuguese Districts Map With Names.",
      hint: "Click a district to view synthetic municipalities.",
      back: "Back to districts",
      title: "Cases by municipality",
      filterLabel: "Municipality filter",
      filterAction: "Filter",
      officialSource: "Municipality geometry: DGT CAOP2025 Mainland Portugal, simplified for web display.",
      breadcrumb: "Portugal -> {district} -> municipalities",
      empty: "No municipality data for this district under the current filters."
    },
    dataPanel: {
      load: "Load Data",
      checks: "Data check results",
      unused: "Columns not used directly",
      quality: "Data quality",
      uploaded: "Uploaded Data",
      structure: "Dataset variable structure",
      rowsLoaded: "rows loaded",
      rowsAfterFilters: "rows after current filters",
      mandatoryPass: "All mandatory fields pass the current prototype checks.",
      noneDetected: "None detected.",
      missingMandatory: "Missing mandatory rows",
      missingAge: "missing age/age_group",
      negativeAges: "negative ages",
      structureIntro: "This version accepts a case line-list CSV and aggregates it to ISO weeks. Crude rates are shown only when a supported denominator source is configured for the selected filters; uploaded case line-lists alone are counts-only. FarringtonFlexible and GLM are routed through the local R bridge, while EARS and CUSUM remain native prototypes.",
      field: "Field",
      required: "Required",
      type: "Type",
      definition: "Definition"
    },
    report: {
      weekly: "Weekly signal output",
      download: "Download Report",
      title: "Report Title",
      format: "Format",
      includeTables: "Include signals tables for strata",
      none: "None",
      minDate: "min",
      maxDate: "max",
      scopePrefix: "Scope",
      stratifiedBy: "stratified by",
      method: "Method",
      denominator: "Denominator/rates",
      denominatorText: "crude rates per 100k are shown only when numerator filters and denominator scope are explicit; uploaded case line-lists alone remain counts-only.",
      prototypeLimits: "Prototype limits",
      prototypeText: "FarringtonFlexible and GLM are served through the local R bridge; EARS and CUSUM remain native prototypes.",
      currentFilters: "Current filters",
      district: "district",
      municipality: "municipality",
      sex: "sex",
      dates: "dates"
    }
  }
} satisfies Record<Language, Record<string, unknown>>;

const methodOptions = [
  { value: "farrington", label: "FarringtonFlexible", status: "seasonal surveillance, >=208 historical weeks" },
  { value: "ears", label: "EARS", status: "short-history screening" },
  { value: "cusum", label: "CUSUM", status: "cumulative increase screening" },
  { value: "glm", label: "GLM mean", status: "model-based baseline, >=104 historical weeks" }
];

const strataOptions: Array<{ key: StrataKey; label: string }> = [
  { key: "district", label: "District" },
  { key: "age_group", label: "Age group" },
  { key: "sex", label: "Sex" }
];

const ageGroupOrder = ["00-04", "05-09", "10-14", "15-24", "20-24", "25-34", "30-34", "35-44", "40-44", "45-54", "50-54", "55-64", "65-74", "75-84", "85+"];
const sexOrder = ["male", "female", "diverse", "unknown"];

function ageGroupFor(row: CaseRecord): string {
  if (row.age_group) return row.age_group;
  if (row.age === undefined) return "unknown";
  if (row.age >= 85) return "85+";
  const start = Math.floor(row.age / 10) * 10;
  const end = start + 9;
  return `${String(start).padStart(2, "0")}-${String(end).padStart(2, "0")}`;
}

function inDetectionWindow(rows: CaseRecord[], weeks: number): CaseRecord[] {
  const dated = rows
    .map((row) => ({ row, time: Date.parse(`${row.date_report}T00:00:00Z`) }))
    .filter(({ time }) => Number.isFinite(time));
  const latest = Math.max(...dated.map(({ time }) => time));
  const start = latest - (Math.max(1, weeks) - 1) * 7 * 24 * 60 * 60 * 1000;
  return dated.filter(({ time }) => time >= start && time <= latest).map(({ row }) => row);
}

function uniqueValues(rows: CaseRecord[], getValue: (row: CaseRecord) => string | undefined): string[] {
  return [...new Set(rows.map(getValue).filter((value): value is string => Boolean(value)))].sort();
}

function minDate(rows: CaseRecord[]): string {
  return uniqueValues(rows, (row) => row.date_report)[0] ?? "";
}

function maxDate(rows: CaseRecord[]): string {
  const values = uniqueValues(rows, (row) => row.date_report);
  return values[values.length - 1] ?? "";
}

function isoYearWeek(dateText: string): { year: number; week: number } | null {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (!Number.isFinite(date.valueOf())) return null;
  const target = new Date(date.valueOf());
  const day = (date.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDay = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3);
  const week = 1 + Math.round((target.valueOf() - firstThursday.valueOf()) / 604800000);
  return { year: target.getUTCFullYear(), week };
}

function isoWeekLabel(dateText: string): string {
  const value = isoYearWeek(dateText);
  return value ? `${value.year}-W${String(value.week).padStart(2, "0")}` : dateText;
}

function detectionPeriodLabel(rows: CaseRecord[], fallbackFrom: string, fallbackTo: string, language: Language): string {
  const from = minDate(rows) || fallbackFrom;
  const to = maxDate(rows) || fallbackTo;
  if (!from && !to) return "n/a";
  if (from && to) return `${isoWeekLabel(from)} ${language === "pt" ? "a" : "to"} ${isoWeekLabel(to)}`;
  return isoWeekLabel(from || to);
}

function isSignalCase(row: CaseRecord): boolean {
  return row.outbreak_status?.toLowerCase() === "yes";
}

function buildStratumItems(rows: CaseRecord[], getLabel: (row: CaseRecord) => string, order: string[]): StratumItem[] {
  const map = new Map<string, { cases: number; signals: number }>();

  for (const label of order) {
    map.set(label, { cases: 0, signals: 0 });
  }

  for (const row of rows) {
    const label = getLabel(row) || "unknown";
    const current = map.get(label) ?? { cases: 0, signals: 0 };
    current.cases += 1;
    if (isSignalCase(row)) current.signals += 1;
    map.set(label, current);
  }

  return [...map.entries()]
    .filter(([label, value]) => value.cases > 0 || order.includes(label))
    .map(([label, value]) => ({
      label,
      cases: value.cases,
      signals: value.signals > 0 ? 1 : 0,
      signal: value.signals > 0
    }));
}

function buildMunicipalityItems(rows: CaseRecord[], shapes: MunicipalityMapShape[]): StratumItem[] {
  const map = new Map<string, { label: string; cases: number; signals: number }>();
  for (const shape of shapes) {
    map.set(shape.municipality_id, { label: shape.municipality, cases: 0, signals: 0 });
  }
  for (const row of rows) {
    const key = row.municipality_id || row.municipality || "unknown";
    const current = map.get(key) ?? { label: row.municipality || key, cases: 0, signals: 0 };
    current.cases += 1;
    if (isSignalCase(row)) current.signals += 1;
    map.set(key, current);
  }
  return [...map.values()].map((value) => ({
    label: value.label,
    cases: value.cases,
    signals: value.signals > 0 ? 1 : 0,
    signal: value.signals > 0
  }));
}

function countSignalStrata(items: StratumItem[]): number {
  return items.filter((item) => item.signal).length;
}

function applySignalPostProcessing(results: WeeklyResult[], minCasesSignal: number): WeeklyResult[] {
  return results.map((row) => ({
    ...row,
    alarm: row.alarm && row.cases >= minCasesSignal
  }));
}

function historicWeeks(from: string, to: string, detectionWeeks: number): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`) - detectionWeeks * 7 * 24 * 60 * 60 * 1000;
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return 0;
  return Math.ceil((end - start + 24 * 60 * 60 * 1000) / (7 * 24 * 60 * 60 * 1000));
}

function possibleMethodValues(weeksAvailable: number): string[] {
  if (weeksAvailable >= 208) return ["farrington", "glm", "ears", "cusum"];
  if (weeksAvailable >= 104) return ["glm", "ears", "cusum"];
  if (weeksAvailable >= 26) return ["ears", "cusum"];
  if (weeksAvailable >= 1) return ["cusum"];
  return [];
}

function methodDisabledReason(value: string, weeksAvailable: number): string {
  if (value === "farrington") return `requires >=208 historical weeks; current ${weeksAvailable}`;
  if (value === "glm") return `requires >=104 historical weeks; current ${weeksAvailable}`;
  if (value === "ears") return `requires >=26 historical weeks; current ${weeksAvailable}`;
  return `requires >=1 historical week; current ${weeksAvailable}`;
}

function fieldRequiredText(field: (typeof expectedFields)[number], language: Language): string {
  if (language === "pt") return field.requiredPt ?? field.required;
  return field.required;
}

function fieldDescriptionText(field: (typeof expectedFields)[number], language: Language): string {
  if (language === "pt") return field.descriptionPt ?? field.description;
  return field.description;
}

function initialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  return new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "pt";
}

function initialSection(): SectionKey {
  if (typeof window === "undefined") return "signals";
  const section = new URLSearchParams(window.location.search).get("section");
  return section === "data" || section === "input" || section === "report" || section === "signals" ? section : "signals";
}

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function methodLabel(value: string): string {
  return methodOptions.find((option) => option.value === value)?.label ?? value;
}

function buildShinyLikeHtmlReport({
  title,
  format,
  includeTables,
  summary,
  signalCount,
  parameters,
  results,
  signalStrata
}: {
  title: string;
  format: string;
  includeTables: boolean;
  summary: ReturnType<typeof summarize>;
  signalCount: number;
  parameters: Record<string, unknown>;
  results: WeeklyResult[];
  signalStrata: Record<string, number>;
}): string {
  const generatedAt = new Date().toISOString();
  const alarmRows = results.filter((row) => row.alarm);
  const rowsHtml = results.map((row) => `
    <tr>
      <td>${row.year}</td>
      <td>${row.week}</td>
      <td>${row.cases}</td>
      <td class="${row.alarm ? "alarm" : ""}">${row.alarm === null ? "" : String(row.alarm)}</td>
      <td>${row.expected === null ? "" : row.expected.toFixed(2)}</td>
      <td>${row.upperbound === null ? "" : row.upperbound.toFixed(2)}</td>
      <td>${row.population === null ? "" : row.population.toLocaleString()}</td>
      <td>${row.ratePer100k === null ? "" : row.ratePer100k.toFixed(2)}</td>
    </tr>
  `).join("");
  const denominatorNote = typeof parameters.denominatorNote === "string" ? parameters.denominatorNote : "";
  const alarmHtml = alarmRows.length
    ? alarmRows.map((row) => `<li>ISO ${row.year}-W${row.week}: ${row.cases} cases; upper bound ${row.upperbound?.toFixed(2) ?? "n/a"}.</li>`).join("")
    : "<li>No unstratified alarms in the selected detection period.</li>";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 32px; color: #111827; font-family: Arial, sans-serif; }
    header { border-bottom: 4px solid #304794; padding-bottom: 16px; margin-bottom: 22px; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    h2 { margin-top: 28px; color: #304794; font-size: 18px; }
    .meta, .warning { border: 1px solid #d7dce6; padding: 14px; background: #f8f9fc; }
    .warning { border-color: #df536b; background: #fff0f2; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }
    .metric { background: #304794; color: white; padding: 14px; }
    .metric strong { display: block; font-size: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    th, td { border: 1px solid #d7dce6; padding: 7px 8px; text-align: left; }
    th { background: #eef1f8; }
    .alarm { color: #b42318; font-weight: 700; }
    footer { margin-top: 34px; color: #667085; font-size: 12px; }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(title)}</h1>
    <div>Generated: ${generatedAt}</div>
  </header>
  <section class="warning">
    <strong>Validation status:</strong> this report mirrors the Shiny workflow, but operational use still depends on parity-tested workers. FarringtonFlexible and GLM are already routed through the local R bridge; EARS and CUSUM remain native prototype paths pending broader operational hardening.
  </section>
  <section class="metrics">
    <div class="metric"><span>Rows</span><strong>${summary.rows}</strong></div>
    <div class="metric"><span>ISO weeks</span><strong>${summary.weeks}</strong></div>
    <div class="metric"><span>Signals</span><strong>${summary.signals}</strong></div>
    <div class="metric"><span>Synthetic flagged strata</span><strong>${signalCount}</strong></div>
  </section>
  <section class="meta">
    <h2>Input parameters</h2>
    <p><strong>Method:</strong> ${escapeHtml(methodLabel(String(parameters.method)))} (${escapeHtml(String(parameters.method))})</p>
    <p><strong>Disease/pathogen:</strong> ${escapeHtml(parameters.disease)}</p>
    <p><strong>Detection weeks:</strong> ${escapeHtml(parameters.detectionWeeks)}</p>
    <p><strong>Alpha:</strong> ${escapeHtml(Number(parameters.alphaUpper ?? 0.05).toFixed(3))}</p>
    <p><strong>Denominator population:</strong> ${escapeHtml(summary.population === null ? "n/a" : summary.population.toLocaleString())}</p>
    <p><strong>Crude rate per 100k:</strong> ${escapeHtml(summary.latestRatePer100k === null ? "n/a" : summary.latestRatePer100k.toFixed(1))}</p>
    <p><strong>Filters:</strong> district ${escapeHtml(parameters.selectedDistrict)}, sex ${escapeHtml(parameters.selectedSex)}, dates ${escapeHtml(parameters.dateFrom)} to ${escapeHtml(parameters.dateTo)}</p>
    <p><strong>Strata:</strong> ${escapeHtml(Array.isArray(parameters.selectedStrata) ? parameters.selectedStrata.join(", ") : "")}</p>
    <p><strong>Requested format:</strong> ${escapeHtml(format)}; include tables: ${includeTables ? "yes" : "no"}</p>
  </section>
  <section>
    <h2>Summary interpretation</h2>
    <p>The analysis evaluated the filtered line-list across the last ${summary.detectionWeeks} ISO weeks. Crude rates per 100k are shown only when the numerator filters and denominator scope are explicit; uploaded case line-lists alone remain counts-only. FarringtonFlexible and GLM are served through the local R bridge; EARS and CUSUM remain native prototypes.</p>
    ${denominatorNote ? `<p>${escapeHtml(denominatorNote)}</p>` : ""}
    <ul>${alarmHtml}</ul>
  </section>
  <section>
    <h2>Synthetic flags by selected stratum</h2>
    <ul>
      <li>age_group: ${signalStrata.age_group}</li>
      <li>district: ${signalStrata.district}</li>
      <li>sex: ${signalStrata.sex}</li>
    </ul>
  </section>
  ${includeTables ? `<section><h2>Weekly output table</h2><table><thead><tr><th>Year</th><th>Week</th><th>Cases</th><th>Signal</th><th>Expected</th><th>Upper bound</th><th>Denominator</th><th>Crude rate/100k</th></tr></thead><tbody>${rowsHtml}</tbody></table></section>` : ""}
  <section>
    <h2>Governance notes</h2>
    <p>Do not include direct identifiers in uploaded data. Store uploads and generated reports in private storage with access control, audit logs, retention rules and documented legal basis before using real health data.</p>
  </section>
  <footer>Signal Detection Tool PT prototype. Inspired by United4Surveillance Signal Detection Tool and Shiny report workflow.</footer>
</body>
</html>`;
}

function MiniTabs({
  activeSection = "signals",
  onSectionChange,
  language
}: {
  activeSection?: SectionKey;
  onSectionChange?: (section: SectionKey) => void;
  language: Language;
}) {
  const t = copy[language];
  const tabs: NavTab[] = [
    { label: t.tabs.help, icon: "?", href: "/background" },
    { label: t.tabs.data, icon: "□", section: "data" },
    { label: t.tabs.input, icon: "?", section: "input" },
    { label: t.tabs.signals, icon: "╬", section: "signals" },
    { label: t.tabs.report, icon: "↓", section: "report" }
  ];
  return (
    <nav className={styles.tabs} aria-label="Application sections">
      {tabs.map((tab) => (
        "href" in tab ? (
          <Link key={tab.label} href={tab.href}>
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </Link>
        ) : (
          <Link
            key={tab.label}
            href={`/?lang=${language}&section=${tab.section}`}
            className={activeSection === tab.section ? styles.activeTab : ""}
            onClick={() => {
              onSectionChange?.(tab.section as SectionKey);
            }}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </Link>
        )
      ))}
    </nav>
  );
}

function AppHeader({
  language = "pt",
  activeSection = "signals",
  onLanguageChange,
  languageHref
}: {
  language?: Language;
  activeSection?: SectionKey;
  onLanguageChange?: (language: Language) => void;
  languageHref?: (language: Language) => Route;
}) {
  const t = copy[language];
  const hrefForLanguage = languageHref ?? ((nextLanguage: Language) => `/?lang=${nextLanguage}&section=${activeSection}` as Route);
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerIntro}>
        <div className={styles.appMark} aria-hidden="true">SD</div>
        <div>
          <p>{t.subtitle}</p>
          <h1>Signal Detection Tool</h1>
          <div className={styles.headerBadges} aria-label="Application status">
            {t.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
        </div>
      </div>
      <div className={styles.headerActions}>
        <div className={styles.languageToggle} aria-label="Language">
          <Link
            href={hrefForLanguage("pt")}
            className={language === "pt" ? styles.activeLanguage : ""}
            onClick={() => {
              onLanguageChange?.("pt");
            }}
          >
            PT
          </Link>
          <Link
            href={hrefForLanguage("en")}
            className={language === "en" ? styles.activeLanguage : ""}
            onClick={() => {
              onLanguageChange?.("en");
            }}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}

export { AppHeader, MiniTabs };

function MetricCard({
  label,
  value,
  tone = "blue",
  wide = false
}: {
  label: string;
  value: ReactNode;
  tone?: "blue" | "red";
  wide?: boolean;
}) {
  return (
    <section className={`${styles.metricCard} ${styles[tone]} ${wide ? styles.wideMetric : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  );
}

function districtMapTone(cases: number, maxCases: number): string {
  if (cases === 0) return styles.mapZero;
  if (cases >= maxCases * 0.72) return styles.mapHigh;
  if (cases >= maxCases * 0.38) return styles.mapMid;
  return styles.mapLow;
}

function ChartControl({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
  onReset,
  resetLabel
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div className={styles.inlineChartControls}>
      <label>
        <span>{label}</span>
        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <em>{display}</em>
      </label>
      <button type="button" onClick={onReset}>{resetLabel}</button>
    </div>
  );
}

function MapPanControl({
  labels,
  disabled,
  onPan
}: {
  labels: {
    pan: string;
    panUp: string;
    panDown: string;
    panLeft: string;
    panRight: string;
    panUpShort: string;
    panDownShort: string;
    panLeftShort: string;
    panRightShort: string;
  };
  disabled: boolean;
  onPan: (dx: number, dy: number) => void;
}) {
  return (
    <div className={styles.mapPanControls} aria-label={labels.pan}>
      <button type="button" disabled={disabled} onClick={() => onPan(0, 34)} aria-label={labels.panUp}>{labels.panUpShort}</button>
      <button type="button" disabled={disabled} onClick={() => onPan(34, 0)} aria-label={labels.panLeft}>{labels.panLeftShort}</button>
      <button type="button" disabled={disabled} onClick={() => onPan(-34, 0)} aria-label={labels.panRight}>{labels.panRightShort}</button>
      <button type="button" disabled={disabled} onClick={() => onPan(0, -34)} aria-label={labels.panDown}>{labels.panDownShort}</button>
    </div>
  );
}

function PortugalDistrictMap({
  areas,
  periodText,
  zoom,
  pan,
  controls,
  panControls,
  title,
  ariaLabel,
  hint,
  legend,
  source,
  onSelectDistrict
}: {
  areas: StratumItem[];
  periodText: string;
  zoom: number;
  pan: MapPan;
  controls: ReactNode;
  panControls: ReactNode;
  title: string;
  ariaLabel: string;
  hint: string;
  legend: {
    zeroCases: string;
    cases: string;
    low: string;
    medium: string;
    high: string;
    flagged: string;
    signalFlag: string;
  };
  source: string;
  onSelectDistrict: (district: string) => void;
}) {
  const byArea = new Map(areas.map((area) => [area.label, area]));
  const maxCases = Math.max(1, ...areas.map((area) => area.cases));
  return (
    <figure className={styles.mapPanel}>
      <figcaption>
        <span>{title}, {periodText}</span>
        {controls}
      </figcaption>
      <div className={styles.svgMapWrap}>
        <p className={styles.mapSource}>{hint}</p>
        <div className={styles.mapViewport}>
          {panControls}
          <svg viewBox="0 0 379.499 547.489" role="img" aria-label={ariaLabel}>
            <g className={styles.portugalMap} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              {portugalDistrictShapes.map((shape) => {
                const area = byArea.get(shape.label) ?? { label: shape.label, cases: 0, signals: 0, signal: false };
                const regionClass = [
                  styles.mapRegion,
                  districtMapTone(area.cases, maxCases),
                  area.signal ? styles.mapSignal : ""
                ].filter(Boolean).join(" ");
                return (
                  <g key={shape.label} transform={shape.transform}>
                    <path
                      className={regionClass}
                      d={shape.path}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectDistrict(shape.label)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelectDistrict(shape.label);
                        }
                      }}
                    >
                      <title>{`${shape.display}: ${area.cases} ${legend.cases}, ${area.signals} ${legend.signalFlag}`}</title>
                    </path>
                    {area.signal && shape.textX !== 0 && shape.textY !== 0 ? (
                      <text className={styles.mapSignalLabel} x={shape.textX} y={shape.textY}>{area.signals}</text>
                    ) : null}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        <div className={styles.tileLegend} aria-hidden="true">
          <span><i className={styles.swatchZero} /> {legend.zeroCases}</span>
          <span><i className={styles.swatchLow} /> {legend.low}</span>
          <span><i className={styles.swatchMid} /> {legend.medium}</span>
          <span><i className={styles.swatchHigh} /> {legend.high}</span>
          <span><i className={styles.signalOutline} /> {legend.signalFlag}</span>
        </div>
        <p className={styles.mapSource}>{source}</p>
      </div>
    </figure>
  );
}

function MunicipalityDrilldown({
  district,
  items,
  shapes,
  periodText,
  pan,
  onBack,
  backLabel,
  breadcrumb,
  title,
  filterLabel,
  filterAction,
  casesLabel,
  flaggedLabel,
  source,
  emptyLabel,
  zoom,
  controls,
  panControls,
  selectedMunicipality,
  onSelectMunicipality,
  allLabel
}: {
  district: string;
  items: StratumItem[];
  shapes: MunicipalityMapShape[];
  periodText: string;
  pan: MapPan;
  onBack: () => void;
  backLabel: string;
  breadcrumb: string;
  title: string;
  filterLabel: string;
  filterAction: string;
  casesLabel: string;
  flaggedLabel: string;
  source: string;
  emptyLabel: string;
  zoom: number;
  controls: ReactNode;
  panControls: ReactNode;
  selectedMunicipality: string;
  onSelectMunicipality: (municipality: string) => void;
  allLabel: string;
}) {
  const maxCases = Math.max(1, ...items.map((item) => item.cases));
  const visibleItems = selectedMunicipality === "All"
    ? items
    : items.filter((item) => item.label === selectedMunicipality);
  const byMunicipality = new Map(items.map((item) => [item.label, item]));
  const visibleShapeNames = new Set(visibleItems.map((item) => item.label));
  return (
    <figure className={styles.mapPanel}>
      <figcaption>
        <span>{title}, {district}, {periodText}</span>
        {controls}
      </figcaption>
      <div className={styles.municipalityPanel}>
        <div className={styles.mapDrillHeader}>
          <span>{breadcrumb}</span>
          <button type="button" onClick={onBack}>{backLabel}</button>
        </div>
        <label className={styles.municipalitySelect}>
          <span>{filterLabel}</span>
          <select value={selectedMunicipality} onChange={(event) => onSelectMunicipality(event.target.value)}>
            <option value="All">{allLabel}</option>
            {items.map((item) => <option key={item.label}>{item.label}</option>)}
          </select>
        </label>
        {shapes.length ? (
          <div className={styles.municipalityViewport}>
            {panControls}
            <svg viewBox={portugalMunicipalityMapMeta.viewBox} role="img" aria-label={`${title}, ${district}`}>
              <g className={styles.portugalMap} style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
                {shapes.map((shape) => {
                  const item = byMunicipality.get(shape.municipality) ?? { label: shape.municipality, cases: 0, signals: 0, signal: false };
                  const muted = selectedMunicipality !== "All" && !visibleShapeNames.has(shape.municipality);
                  const regionClass = [
                    styles.mapRegion,
                    districtMapTone(item.cases, maxCases),
                    item.signal ? styles.mapSignal : "",
                    muted ? styles.mapMuted : ""
                  ].filter(Boolean).join(" ");
                  return (
                    <path
                      className={regionClass}
                      d={shape.path}
                      key={shape.municipality_id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelectMunicipality(shape.municipality)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelectMunicipality(shape.municipality);
                        }
                      }}
                    >
                      <title>{`${shape.municipality}: ${item.cases} ${casesLabel}${item.signal ? `, ${flaggedLabel}` : ""}`}</title>
                    </path>
                  );
                })}
              </g>
            </svg>
            {visibleItems.some((item) => item.cases > 0) ? null : (
              <p className={styles.mapEmptyNote}>{emptyLabel}</p>
            )}
          </div>
        ) : (
          <p className={styles.referenceIntro}>{emptyLabel}</p>
        )}
        <p className={styles.mapSource}>{source}</p>
      </div>
    </figure>
  );
}

function GroupedBarChart({
  title,
  items,
  max,
  showSignalCounts,
  zoom,
  controls
}: {
  title: string;
  items: StratumItem[];
  max: number;
  showSignalCounts: boolean;
  zoom: number;
  controls: ReactNode;
}) {
  const denominator = Math.max(1, max / Math.max(0.5, zoom));
  return (
    <figure className={styles.barPanel}>
      <figcaption>
        <span>{title}</span>
        {controls}
      </figcaption>
      <div className={styles.legend}>
        <span><i className={styles.signalKey} /> Synthetic outbreak flag</span>
        <span><i className={styles.noSignalKey} /> No synthetic flag</span>
      </div>
      <div className={styles.strataBars}>
        {items.map((item) => (
          <div key={item.label} className={styles.strataRow}>
            <span className={styles.strataLabel}>{item.label}</span>
            <div className={styles.strataTrack}>
              <div
                className={item.signal ? styles.strataBarSignal : styles.strataBar}
                style={{ width: `${Math.min(100, Math.max(3, (item.cases / denominator) * 100))}%` }}
              >
                <span>{item.cases}</span>
              </div>
            </div>
            <span className={item.signal ? styles.strataFlag : styles.strataNoFlag}>
              {item.signal ? (showSignalCounts ? `${item.signals} flagged` : "flagged") : ""}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function WeeklyTable({ results }: { results: WeeklyResult[] }) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Week</th>
            <th>Cases</th>
            <th>Signal</th>
            <th>Expected</th>
            <th>Upper bound</th>
            <th>Denominator</th>
            <th>Crude rate/100k</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={`${row.year}-${row.week}`}>
              <td>{row.year}</td>
              <td>{row.week}</td>
              <td>{row.cases}</td>
              <td className={row.alarm ? styles.alarm : styles.muted}>{row.alarm === null ? "" : String(row.alarm)}</td>
              <td>{row.expected === null ? "" : row.expected.toFixed(2)}</td>
              <td>{row.upperbound === null ? "" : row.upperbound.toFixed(2)}</td>
              <td>{row.population === null ? "" : row.population.toLocaleString()}</td>
              <td>{row.ratePer100k === null ? "" : row.ratePer100k.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function isoResultLabel(row: WeeklyResult): string {
  return `${row.year}-W${String(row.week).padStart(2, "0")}`;
}

function lineSegments(
  rows: WeeklyResult[],
  getValue: (row: WeeklyResult) => number | null,
  xForIndex: (index: number) => number,
  yForValue: (value: number) => number
): string[] {
  const segments: string[] = [];
  let current: string[] = [];

  rows.forEach((row, index) => {
    const value = getValue(row);
    if (value === null) {
      if (current.length > 1) segments.push(current.join(" "));
      current = [];
      return;
    }
    current.push(`${xForIndex(index)},${yForValue(value)}`);
  });

  if (current.length > 1) segments.push(current.join(" "));
  return segments;
}

function TimeSeriesChart({
  results,
  detectionWeeks,
  visibleWeeksTarget,
  controls
}: {
  results: WeeklyResult[];
  detectionWeeks: number;
  visibleWeeksTarget: number;
  controls: ReactNode;
}) {
  const width = 920;
  const height = 330;
  const pad = { top: 42, right: 34, bottom: 58, left: 62 };
  const visibleWeeks = Math.min(results.length, Math.max(detectionWeeks, visibleWeeksTarget));
  const visibleResults = results.slice(-visibleWeeks);
  const hiddenWeeks = Math.max(0, results.length - visibleResults.length);
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const maxValue = Math.max(
    1,
    ...visibleResults.map((row) => Math.max(row.cases, row.expected ?? 0, row.upperbound ?? 0))
  );
  const step = plotWidth / Math.max(1, visibleResults.length);
  const barWidth = Math.max(3, Math.min(14, step * 0.62));
  const xForIndex = (index: number) => pad.left + index * step + step / 2;
  const yForValue = (value: number) => pad.top + plotHeight - (value / maxValue) * plotHeight;
  const upperSegments = lineSegments(visibleResults, (row) => row.upperbound, xForIndex, yForValue);
  const expectedSegments = lineSegments(visibleResults, (row) => row.expected, xForIndex, yForValue);
  const detectionStartIndex = Math.max(0, visibleResults.length - detectionWeeks);
  const detectionX = pad.left + detectionStartIndex * step;
  const detectionWidth = Math.max(0, width - pad.right - detectionX);
  const alarms = visibleResults.filter((row) => row.alarm).length;
  const latest = visibleResults[visibleResults.length - 1];
  const tickEvery = Math.max(1, Math.ceil(visibleResults.length / 8));
  const historyWeeks = Math.max(0, results.length - detectionWeeks);

  return (
    <figure className={styles.timeSeriesPanel}>
      <figcaption>
        <span>Weekly signal model view</span>
        {controls}
        <small>
          {hiddenWeeks > 0 ? `Showing last ${visibleResults.length} of ${results.length} ISO weeks. ` : ""}
          Detection window: last {detectionWeeks} weeks.
        </small>
      </figcaption>
      <div className={styles.modelChips} aria-label="Model diagnostics">
        <span>History before window: {historyWeeks} weeks</span>
        <span>Alarms in view: {alarms}</span>
        <span>Latest expected: {latest?.expected === null || latest?.expected === undefined ? "n/a" : latest.expected.toFixed(1)}</span>
        <span>Latest upper bound: {latest?.upperbound === null || latest?.upperbound === undefined ? "n/a" : latest.upperbound.toFixed(1)}</span>
      </div>
      <svg className={styles.timeChart} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Weekly cases, alarms and upper threshold">
        <rect className={styles.detectionBand} x={detectionX} y={pad.top} width={detectionWidth} height={plotHeight} />
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = pad.top + plotHeight - tick * plotHeight;
          return (
            <g key={tick}>
              <line className={styles.gridLine} x1={pad.left} x2={width - pad.right} y1={y} y2={y} />
              <text className={styles.axisText} x={pad.left - 10} y={y + 4} textAnchor="end">{Math.round(tick * maxValue)}</text>
            </g>
          );
        })}
        <line className={styles.axisLine} x1={pad.left} x2={pad.left} y1={pad.top} y2={height - pad.bottom} />
        <line className={styles.axisLine} x1={pad.left} x2={width - pad.right} y1={height - pad.bottom} y2={height - pad.bottom} />
        {visibleResults.map((row, index) => {
          const x = xForIndex(index) - barWidth / 2;
          const barHeight = (row.cases / maxValue) * plotHeight;
          const y = pad.top + plotHeight - barHeight;
          return (
            <g key={`${row.year}-${row.week}`}>
              <rect className={row.alarm ? styles.timeSignalBar : styles.timeBar} x={x} y={y} width={barWidth} height={Math.max(1.5, barHeight)} rx="2">
                <title>{`${isoResultLabel(row)}: ${row.cases} cases${row.alarm ? "; alarm" : ""}`}</title>
              </rect>
              {row.alarm ? (
                <circle className={styles.alarmMarker} cx={xForIndex(index)} cy={Math.max(pad.top + 7, y - 7)} r="5">
                  <title>{`${isoResultLabel(row)} alarm: ${row.cases} cases; upper bound ${row.upperbound?.toFixed(1) ?? "n/a"}`}</title>
                </circle>
              ) : null}
              {index === 0 || index === visibleResults.length - 1 || (index % tickEvery === 0 && index < visibleResults.length - Math.max(2, Math.floor(tickEvery / 2))) ? (
                <text className={styles.axisText} x={xForIndex(index)} y={height - 24} textAnchor="middle">{isoResultLabel(row)}</text>
              ) : null}
            </g>
          );
        })}
        {expectedSegments.map((points, index) => <polyline key={`expected-${index}`} className={styles.expectedLine} points={points} />)}
        {upperSegments.map((points, index) => <polyline key={`upper-${index}`} className={styles.thresholdLine} points={points} />)}
        <g className={styles.timeLegend}>
          <rect className={styles.timeBar} x={width - 204} y={18} width={12} height={10} rx="2" />
          <text x={width - 186} y={27}>Cases</text>
          <line className={styles.expectedLine} x1={width - 130} x2={width - 104} y1={23} y2={23} />
          <text x={width - 98} y={27}>Expected</text>
          <line className={styles.thresholdLine} x1={width - 130} x2={width - 104} y1={41} y2={41} />
          <text x={width - 98} y={45}>Upper bound</text>
          <circle className={styles.alarmMarker} cx={width - 198} cy={41} r="5" />
          <text x={width - 186} y={45}>Alarm</text>
        </g>
        <text className={styles.axisLabel} x={22} y={height / 2} transform={`rotate(-90 22 ${height / 2})`}>Number of cases</text>
        <text className={styles.axisLabel} x={width / 2} y={height - 8} textAnchor="middle">ISO week</text>
      </svg>
    </figure>
  );
}

function DataPreview({ rows }: { rows: CaseRecord[] }) {
  const preview = rows.slice(0, 12);
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>case_id</th>
            <th>date_report</th>
            <th>pathogen</th>
            <th>district</th>
            <th>age_group</th>
            <th>sex</th>
            <th>outbreak_status</th>
          </tr>
        </thead>
        <tbody>
          {preview.map((row) => (
            <tr key={row.case_id}>
              <td>{row.case_id}</td>
              <td>{row.date_report}</td>
              <td>{row.pathogen}</td>
              <td>{row.district ?? ""}</td>
              <td>{row.age_group ?? ""}</td>
              <td>{row.sex ?? ""}</td>
              <td>{row.outbreak_status ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>(() => initialLanguage());
  const t = copy[language];
  const [activeSection, setActiveSection] = useState<SectionKey>(() => initialSection());
  const [cases, setCases] = useState<CaseRecord[]>(() => makeDemoCases());
  const [datasetSource, setDatasetSource] = useState<"demo" | "upload">("demo");
  const [detectionWeeks, setDetectionWeeks] = useState(6);
  const [showMode, setShowMode] = useState("show");
  const [message, setMessage] = useState(copy.pt.messages.loaded);
  const [errors, setErrors] = useState<string[]>([]);
  const [method, setMethod] = useState("cusum");
  const [selectedPathogen, setSelectedPathogen] = useState("Pertussis");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedMunicipality, setSelectedMunicipality] = useState("All");
  const [mapLevel, setMapLevel] = useState<MapLevel>("district");
  const [selectedMapDistrict, setSelectedMapDistrict] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState("All");
  const [dateFrom, setDateFrom] = useState("2020-01-06");
  const [dateTo, setDateTo] = useState("2024-03-18");
  const [selectedStrata, setSelectedStrata] = useState<StrataKey[]>(["district", "age_group", "sex"]);
  const [alphaUpper, setAlphaUpper] = useState(0.05);
  const [minCasesSignal, setMinCasesSignal] = useState(1);
  const [timeWindowWeeks, setTimeWindowWeeks] = useState(52);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPan, setMapPan] = useState<MapPan>({ x: 0, y: 0 });
  const [ageGroupZoom, setAgeGroupZoom] = useState(1);
  const [sexZoom, setSexZoom] = useState(1);
  const [reportTitle, setReportTitle] = useState("Signal Detection Report");
  const [reportFormat, setReportFormat] = useState("HTML");
  const [includeTables, setIncludeTables] = useState(true);

  const pathogens = useMemo(() => uniqueValues(cases, (row) => row.pathogen), [cases]);
  const districts = useMemo(() => uniqueValues(cases, (row) => row.district), [cases]);
  const municipalityOptions = useMemo(
    () => uniqueValues(
      cases.filter((row) => selectedDistrict === "All" || row.district === selectedDistrict),
      (row) => row.municipality
    ),
    [cases, selectedDistrict]
  );
  const sexes = useMemo(() => uniqueValues(cases, (row) => row.sex), [cases]);
  const dataMinDate = useMemo(() => minDate(cases), [cases]);
  const dataMaxDate = useMemo(() => maxDate(cases), [cases]);
  const weeksAvailable = useMemo(
    () => historicWeeks(dateFrom || dataMinDate, dateTo || dataMaxDate, detectionWeeks),
    [dataMaxDate, dataMinDate, dateFrom, dateTo, detectionWeeks]
  );
  const possibleMethods = useMemo(() => possibleMethodValues(weeksAvailable), [weeksAvailable]);
  const filteredCases = useMemo(
    () => cases.filter((row) => {
      if (selectedPathogen !== "All" && row.pathogen !== selectedPathogen) return false;
      if (selectedDistrict !== "All" && row.district !== selectedDistrict) return false;
      if (selectedMunicipality !== "All" && row.municipality !== selectedMunicipality) return false;
      if (selectedSex !== "All" && row.sex !== selectedSex) return false;
      if (dateFrom && row.date_report < dateFrom) return false;
      if (dateTo && row.date_report > dateTo) return false;
      return true;
    }),
    [cases, dateFrom, dateTo, selectedDistrict, selectedMunicipality, selectedPathogen, selectedSex]
  );
  const denominatorResolution = useMemo(
    () => resolveCrudeDenominator(datasetSource, selectedDistrict, selectedSex, language),
    [datasetSource, language, selectedDistrict, selectedSex]
  );
  const results = useMemo(
    () => applySignalPostProcessing(runDemoModel(filteredCases, detectionWeeks, alphaUpper, denominatorResolution.population), minCasesSignal),
    [denominatorResolution.population, filteredCases, detectionWeeks, alphaUpper, minCasesSignal]
  );
  const summary = useMemo(
    () => summarize(filteredCases, results, detectionWeeks, denominatorResolution.population),
    [denominatorResolution.population, filteredCases, results, detectionWeeks]
  );
  const detectionRows = useMemo(() => inDetectionWindow(filteredCases, detectionWeeks), [filteredCases, detectionWeeks]);
  const ageGroupItems = useMemo(
    () => buildStratumItems(detectionRows, ageGroupFor, ageGroupOrder),
    [detectionRows]
  );
  const sexItems = useMemo(
    () => buildStratumItems(detectionRows, (row) => row.sex || "unknown", sexOrder),
    [detectionRows]
  );
  const districtItems = useMemo(
    () => buildStratumItems(detectionRows, (row) => row.district || "unknown", portugalDistrictShapes.map((area) => area.label)),
    [detectionRows]
  );
  const municipalityItems = useMemo(() => {
    if (!selectedMapDistrict) return [];
    const shapes = portugalMunicipalityShapesByDistrict[selectedMapDistrict] ?? [];
    const rows = detectionRows.filter((row) => row.district === selectedMapDistrict);
    if (shapes.length) return buildMunicipalityItems(rows, shapes);
    const order = (syntheticMunicipalitiesByDistrict[selectedMapDistrict] ?? []).map((area) => area.municipality);
    return buildStratumItems(rows, (row) => row.municipality || "unknown", order);
  }, [detectionRows, selectedMapDistrict]);
  const municipalityShapes = useMemo(
    () => selectedMapDistrict ? portugalMunicipalityShapesByDistrict[selectedMapDistrict] ?? [] : [],
    [selectedMapDistrict]
  );
  const signalStrata = useMemo(
    () => ({
      age_group: countSignalStrata(ageGroupItems),
      district: countSignalStrata(districtItems),
      sex: countSignalStrata(sexItems)
    }),
    [ageGroupItems, districtItems, sexItems]
  );
  const supabaseConfigured = isSupabaseConfigured();
  const signalCount = signalStrata.age_group + signalStrata.district + signalStrata.sex;
  const nudgeMapPan = (dx: number, dy: number) => {
    setMapPan((current) => ({
      x: Math.max(-180, Math.min(180, current.x + dx)),
      y: Math.max(-180, Math.min(180, current.y + dy))
    }));
  };
  const resetMapViewport = () => {
    setMapZoom(1);
    setMapPan({ x: 0, y: 0 });
  };
  const handleMapZoomChange = (nextZoom: number) => {
    setMapZoom(nextZoom);
    if (nextZoom <= 1) setMapPan({ x: 0, y: 0 });
  };
  const ageGroupMax = Math.max(1, ...ageGroupItems.map((item) => item.cases));
  const sexMax = Math.max(1, ...sexItems.map((item) => item.cases));
  const timeWindowMin = Math.min(results.length || 1, Math.max(detectionWeeks, 12));
  const timeWindowMax = Math.max(timeWindowMin, results.length || timeWindowMin);
  const effectiveTimeWindowWeeks = Math.min(timeWindowMax, Math.max(timeWindowMin, timeWindowWeeks));
  const showSignalCounts = showMode === "show";
  const periodText = detectionPeriodLabel(detectionRows, dateFrom, dateTo, language);
  const disease = selectedPathogen === "All" ? t.labels.allPathogens : selectedPathogen;
  const unstratifiedAlarms = results.filter((row) => row.alarm).length;
  const unusedColumns = ["country", "country_id", "region", "region_id", "municipality", "municipality_id"].filter((name) =>
    cases.some((row) => Boolean(row[name as keyof CaseRecord]))
  );
  const missingRequiredRows = cases.filter((row) => !row.case_id || !row.date_report || !row.country || !row.country_id || !row.pathogen).length;
  const missingAgeRows = cases.filter((row) => row.age === undefined && !row.age_group).length;
  const negativeAgeRows = cases.filter((row) => typeof row.age === "number" && row.age < 0).length;
  const denominatorNote = denominatorResolution.note;

  useEffect(() => {
    const nextLanguage = searchParams.get("lang") === "en" ? "en" : "pt";
    const section = searchParams.get("section");
    const nextSection = section === "data" || section === "input" || section === "report" || section === "signals" ? section : "signals";
    setLanguage(nextLanguage);
    setActiveSection(nextSection);
  }, [searchParams]);

  useEffect(() => {
    const firstPathogen = pathogens[0] ?? "All";
    if (selectedPathogen !== "All" && !pathogens.includes(selectedPathogen)) {
      setSelectedPathogen(firstPathogen);
    }
  }, [pathogens, selectedPathogen]);

  useEffect(() => {
    if (!dateFrom && dataMinDate) setDateFrom(dataMinDate);
    if (!dateTo && dataMaxDate) setDateTo(dataMaxDate);
  }, [dataMaxDate, dataMinDate, dateFrom, dateTo]);

  useEffect(() => {
    if (possibleMethods.length > 0 && !possibleMethods.includes(method)) {
      setMethod(possibleMethods[0]);
    }
  }, [method, possibleMethods]);

  useEffect(() => {
    if (selectedDistrict !== "All" && selectedMapDistrict !== selectedDistrict) {
      setMapLevel("district");
      setSelectedMapDistrict(null);
    }
  }, [selectedDistrict, selectedMapDistrict]);

  useEffect(() => {
    if (selectedMunicipality !== "All" && !municipalityOptions.includes(selectedMunicipality)) {
      setSelectedMunicipality("All");
    }
  }, [municipalityOptions, selectedMunicipality]);

  function run(rows = filteredCases) {
    const validationErrors = validateCases(rows);
    setErrors(validationErrors);
    if (validationErrors.length > 0) {
      setMessage(t.messages.fixErrors);
      return;
    }
    setMessage(`${methodOptions.find((option) => option.value === method)?.label ?? method} run completed on ${rows.length} rows with alpha ${alphaUpper.toFixed(3)}. Native algorithm outputs remain prototype; R-backed methods are served through the local bridge.`);
  }

  async function handleFile(file: File | null) {
    if (!file) return;
    const text = await file.text();
    const parsed = parseCsv(text);
    setCases(parsed);
    setDatasetSource("upload");
    setDateFrom(minDate(parsed));
    setDateTo(maxDate(parsed));
    setMessage(`${parsed.length} rows loaded from ${file.name}.`);
    setActiveSection("data");
    setErrors(validateCases(parsed));
  }

  function toggleStratum(stratum: StrataKey) {
    setSelectedStrata((current) => {
      if (current.includes(stratum)) return current.filter((item) => item !== stratum);
      if (current.length >= 3) return current;
      return [...current, stratum];
    });
  }

  function changeSection(section: SectionKey) {
    setActiveSection(section);
  }

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
  }

  return (
    <main className={styles.page}>
      <AppHeader language={language} activeSection={activeSection} onLanguageChange={changeLanguage} />
      <MiniTabs activeSection={activeSection} onSectionChange={changeSection} language={language} />

      <section className={styles.metrics} aria-label="Signal summary" hidden={activeSection !== "signals"}>
        <MetricCard
          label={t.metrics.method}
          value={<span>{t.labels.algorithm}: {methodOptions.find((option) => option.value === method)?.label}<br />{t.labels.disease}: {disease}<br />{t.labels.period}: {periodText}<br />{t.labels.alpha}: {alphaUpper.toFixed(3)}</span>}
        />
        <MetricCard
          label={t.metrics.cases}
          value={<span>{t.labels.cases}: {detectionRows.length}<br />{t.labels.alarms}: {unstratifiedAlarms}<br />{t.labels.population}: {summary.population === null ? "n/a" : summary.population.toLocaleString()}<br />{t.labels.ratePer100k}: {summary.latestRatePer100k === null ? "n/a" : summary.latestRatePer100k.toFixed(1)}</span>}
          tone="red"
        />
        <MetricCard
          label={t.metrics.strata}
          value={<span>age_group: {signalStrata.age_group}<br />district: {signalStrata.district}<br />sex: {signalStrata.sex}</span>}
          tone="red"
        />
      </section>
      {denominatorNote ? <p className={styles.referenceIntro}>{denominatorNote}</p> : null}

      <section id="input-parameters" className={styles.controlStrip} hidden={!["input", "signals"].includes(activeSection)}>
        <div>
          <label htmlFor="file">{t.labels.dataFile}</label>
          <input id="file" type="file" accept=".csv" onChange={(event) => void handleFile(event.target.files?.[0] ?? null)} />
        </div>
        <div>
          <label htmlFor="pathogen">{t.labels.pathogen}</label>
          <select id="pathogen" value={selectedPathogen} onChange={(event) => setSelectedPathogen(event.target.value)}>
            {pathogens.length > 1 ? <option value="All">{t.labels.all}</option> : null}
            {pathogens.map((pathogen) => <option key={pathogen}>{pathogen}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="district-filter">{t.labels.district}</label>
          <select
            id="district-filter"
            value={selectedDistrict}
            onChange={(event) => {
              setSelectedDistrict(event.target.value);
              setSelectedMunicipality("All");
            }}
          >
            <option value="All">{t.labels.all}</option>
            {districts.map((district) => <option key={district}>{district}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="municipality-filter">{t.labels.municipality}</label>
          <select
            id="municipality-filter"
            value={selectedMunicipality}
            onChange={(event) => setSelectedMunicipality(event.target.value)}
          >
            <option value="All">{t.labels.all}</option>
            {municipalityOptions.map((municipality) => <option key={municipality}>{municipality}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sex-filter">{t.labels.sex}</label>
          <select id="sex-filter" value={selectedSex} onChange={(event) => setSelectedSex(event.target.value)}>
            <option value="All">{t.labels.all}</option>
            {sexes.map((sex) => <option key={sex}>{sex}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="date-from">{t.labels.dateFrom}</label>
          <input id="date-from" type="date" value={dateFrom} min={dataMinDate} max={dateTo || dataMaxDate} onChange={(event) => setDateFrom(event.target.value)} />
        </div>
        <div>
          <label htmlFor="date-to">{t.labels.dateTo}</label>
          <input id="date-to" type="date" value={dateTo} min={dateFrom || dataMinDate} max={dataMaxDate} onChange={(event) => setDateTo(event.target.value)} />
        </div>
        <div>
          <label htmlFor="weeks">{t.labels.weeks}</label>
          <input id="weeks" type="number" min="1" max="52" value={detectionWeeks} onChange={(event) => setDetectionWeeks(Number(event.target.value))} />
        </div>
        <div>
          <label htmlFor="method">{t.labels.method}</label>
          <select id="method" value={method} onChange={(event) => setMethod(event.target.value)}>
            {methodOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={!possibleMethods.includes(option.value)}>
                {option.label} - {possibleMethods.includes(option.value) ? option.status : methodDisabledReason(option.value, weeksAvailable)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alpha">{t.labels.alpha}</label>
          <input id="alpha" type="number" min="0.001" max="0.2" step="0.001" value={alphaUpper} onChange={(event) => setAlphaUpper(Number(event.target.value))} />
        </div>
        <div>
          <label htmlFor="min-cases">{t.labels.minCases}</label>
          <input id="min-cases" type="number" min="1" value={minCasesSignal} onChange={(event) => setMinCasesSignal(Number(event.target.value))} />
        </div>
        <div>
          <label htmlFor="toggle">{t.labels.toggle}</label>
          <select id="toggle" value={showMode} onChange={(event) => setShowMode(event.target.value)}>
            <option value="show">{t.signalCountMode.show}</option>
            <option value="hide">{t.signalCountMode.hide}</option>
          </select>
        </div>
        <button type="button" onClick={() => run()}>{t.actions.run}</button>
        <button
          type="button"
          onClick={() => {
            const demo = makeDemoCases();
            setCases(demo);
            setDatasetSource("demo");
            setDetectionWeeks(6);
            setDateFrom(minDate(demo));
            setDateTo(maxDate(demo));
            setErrors([]);
            setMessage(t.messages.loadedShort);
          }}
        >
          {t.actions.sample}
        </button>
        <button type="button" onClick={() => download("episignal-demo-results.json", JSON.stringify({ summary, results }, null, 2), "application/json")}>
          {t.actions.export}
        </button>
        <span className={styles.methodHint}>
          {t.methodHint.prefix}: {weeksAvailable}. {t.methodHint.possible}: {possibleMethods.length ? methodOptions.filter((option) => possibleMethods.includes(option.value)).map((option) => option.label).join(", ") : t.methodHint.none}.
        </span>
      </section>

      <section className={styles.panel} hidden={activeSection !== "input"}>
        <div className={styles.panelHeader}>
          <h2>{t.strata.title}</h2>
          <span>{t.messages.strata}</span>
        </div>
        <div className={styles.checkboxList}>
          {strataOptions.map((option) => (
            <label key={option.key}>
              <input type="checkbox" checked={selectedStrata.includes(option.key)} onChange={() => toggleStratum(option.key)} />
              {t.strata[option.key]}
            </label>
          ))}
        </div>
        <p className={styles.referenceIntro}>
          {t.messages.prototype}
        </p>
      </section>

      {["input", "signals"].includes(activeSection) && (errors.length > 0 ? (
        <section className={styles.alert}>
          {errors.map((error) => <div key={error}>{error}</div>)}
        </section>
      ) : (
        <section className={styles.notice}>{message}</section>
      ))}

      <p className={styles.description} hidden={activeSection !== "signals"}>
        {t.messages.description} {language === "pt" ? `Janela: ${detectionWeeks} semanas.` : `Window: ${detectionWeeks} weeks.`}
      </p>

      <section id="signals" className={styles.signalsGrid} hidden={activeSection !== "signals"}>
        {selectedStrata.includes("district") && mapLevel === "district" ? (
          <PortugalDistrictMap
            areas={districtItems}
            periodText={periodText}
            zoom={mapZoom}
            pan={mapPan}
            title={t.mapDrilldown.districtTitle}
            ariaLabel={t.mapDrilldown.ariaLabel}
            hint={t.mapDrilldown.hint}
            legend={{
              zeroCases: t.mapDrilldown.zeroCases,
              cases: t.mapDrilldown.cases,
              low: t.mapDrilldown.low,
              medium: t.mapDrilldown.medium,
              high: t.mapDrilldown.high,
              flagged: t.mapDrilldown.flagged,
              signalFlag: t.mapDrilldown.signalFlag
            }}
            source={t.mapDrilldown.source}
            onSelectDistrict={(district) => {
              setSelectedMapDistrict(district);
              setMapLevel("municipality");
            }}
            controls={(
              <ChartControl
                label={t.chartControls.mapZoom}
                min={0.8}
                max={1.8}
                step={0.1}
                value={mapZoom}
                display={`${mapZoom.toFixed(1)}x`}
                onChange={handleMapZoomChange}
                onReset={resetMapViewport}
                resetLabel={t.chartControls.reset}
              />
            )}
            panControls={(
              <MapPanControl
                labels={t.chartControls}
                disabled={false}
                onPan={nudgeMapPan}
              />
            )}
          />
        ) : null}
        {selectedStrata.includes("district") && mapLevel === "municipality" && selectedMapDistrict ? (
          <MunicipalityDrilldown
            district={selectedMapDistrict}
            items={municipalityItems}
            shapes={municipalityShapes}
            periodText={periodText}
            zoom={mapZoom}
            pan={mapPan}
            backLabel={t.mapDrilldown.back}
            breadcrumb={t.mapDrilldown.breadcrumb.replace("{district}", selectedMapDistrict)}
            title={t.mapDrilldown.title}
            filterLabel={t.mapDrilldown.filterLabel}
            filterAction={t.mapDrilldown.filterAction}
            casesLabel={t.mapDrilldown.cases}
            flaggedLabel={t.mapDrilldown.flagged}
            source={t.mapDrilldown.officialSource}
            emptyLabel={t.mapDrilldown.empty}
            selectedMunicipality={selectedMunicipality}
            onSelectMunicipality={setSelectedMunicipality}
            allLabel={t.labels.all}
            onBack={() => {
              setMapLevel("district");
              setSelectedMapDistrict(null);
              setSelectedMunicipality("All");
              setMapPan({ x: 0, y: 0 });
            }}
            controls={(
              <ChartControl
                label={t.chartControls.mapZoom}
                min={0.8}
                max={1.8}
                step={0.1}
                value={mapZoom}
                display={`${mapZoom.toFixed(1)}x`}
                onChange={handleMapZoomChange}
                onReset={resetMapViewport}
                resetLabel={t.chartControls.reset}
              />
            )}
            panControls={(
              <MapPanControl
                labels={t.chartControls}
                disabled={false}
                onPan={nudgeMapPan}
              />
            )}
          />
        ) : null}
        {selectedStrata.includes("age_group") ? (
          <GroupedBarChart
            title={`Cases by age group, ${periodText}`}
            items={ageGroupItems}
            max={ageGroupMax}
            showSignalCounts={showSignalCounts}
            zoom={ageGroupZoom}
            controls={(
              <ChartControl
                label={t.chartControls.strataZoom}
                min={0.5}
                max={2.5}
                step={0.1}
                value={ageGroupZoom}
                display={`${ageGroupZoom.toFixed(1)}x`}
                onChange={setAgeGroupZoom}
                onReset={() => setAgeGroupZoom(1)}
                resetLabel={t.chartControls.reset}
              />
            )}
          />
        ) : null}
        {selectedStrata.includes("sex") ? (
          <GroupedBarChart
            title={`Cases by sex, ${periodText}`}
            items={sexItems}
            max={sexMax}
            showSignalCounts={showSignalCounts}
            zoom={sexZoom}
            controls={(
              <ChartControl
                label={t.chartControls.strataZoom}
                min={0.5}
                max={2.5}
                step={0.1}
                value={sexZoom}
                display={`${sexZoom.toFixed(1)}x`}
                onChange={setSexZoom}
                onReset={() => setSexZoom(1)}
                resetLabel={t.chartControls.reset}
              />
            )}
          />
        ) : null}
        {selectedStrata.length === 0 ? <article className={styles.panel}>Select at least one stratum in Input parameters.</article> : null}
      </section>

      <section hidden={activeSection !== "signals"}>
        <TimeSeriesChart
          results={results}
          detectionWeeks={detectionWeeks}
          visibleWeeksTarget={effectiveTimeWindowWeeks}
          controls={(
            <ChartControl
              label={t.chartControls.timeWindow}
              min={timeWindowMin}
              max={timeWindowMax}
              step={1}
              value={effectiveTimeWindowWeeks}
              display={`${effectiveTimeWindowWeeks} / ${timeWindowMax}`}
              onChange={setTimeWindowWeeks}
              onReset={() => setTimeWindowWeeks(52)}
              resetLabel={t.chartControls.reset}
            />
          )}
        />
      </section>

      <section id="report" className={styles.lowerGrid} hidden={activeSection !== "report"}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>{t.report.weekly}</h2>
            <span>{summary.rows} rows · {summary.weeks} ISO weeks · Supabase {supabaseConfigured ? "configured" : "not configured"}</span>
          </div>
          <WeeklyTable results={results} />
        </article>

        <aside className={styles.panel}>
          <h2>{t.report.download}</h2>
          <div className={styles.formGrid}>
            <label>
              {t.report.title}
              <input value={reportTitle} onChange={(event) => setReportTitle(event.target.value)} />
            </label>
            <label>
              {t.report.format}
              <select value={reportFormat} onChange={(event) => setReportFormat(event.target.value)}>
                <option>HTML</option>
                <option>JSON</option>
              </select>
            </label>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={includeTables} onChange={(event) => setIncludeTables(event.target.checked)} />
              {t.report.includeTables}
            </label>
          </div>
          <p className={styles.referenceIntro}>
            {t.report.scopePrefix}: {disease}, {periodText}, {t.report.stratifiedBy} {selectedStrata.length ? selectedStrata.join(", ") : t.report.none}. {t.report.method}: {methodOptions.find((option) => option.value === method)?.label}, alpha {alphaUpper.toFixed(3)}. {t.report.denominator}: {t.report.denominatorText} {t.report.prototypeLimits}: {t.report.prototypeText} {t.report.currentFilters}: {t.report.district} {selectedDistrict}, {t.report.municipality} {selectedMunicipality}, {t.report.sex} {selectedSex}, {t.report.dates} {dateFrom || t.report.minDate} {language === "pt" ? "a" : "to"} {dateTo || t.report.maxDate}.
          </p>
          <button type="button" onClick={() => {
            const parameters = { method, disease, detectionWeeks, alphaUpper, minCasesSignal, selectedStrata, selectedDistrict, selectedMunicipality, selectedSex, dateFrom, dateTo, denominatorNote };
            if (reportFormat === "JSON") {
              download("episignal-report-summary.json", JSON.stringify({ title: reportTitle, format: reportFormat, includeTables, summary, signalCount, signalStrata, parameters, results }, null, 2), "application/json");
              return;
            }
            download("episignal-report.html", buildShinyLikeHtmlReport({ title: reportTitle, format: reportFormat, includeTables, summary, signalCount, parameters, results, signalStrata }), "text/html");
          }}>
            {t.actions.createReport}
          </button>
          <button type="button" onClick={() => download("episignal-pt-sample.csv", toCsv(cases), "text/csv")}>
            {t.actions.downloadSample}
          </button>
        </aside>
      </section>

      <section id="data" className={styles.referenceGrid} hidden={activeSection !== "data"}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>{t.dataPanel.load}</h2>
            <span>{cases.length} {t.dataPanel.rowsLoaded} · {filteredCases.length} {t.dataPanel.rowsAfterFilters}</span>
          </div>
          <input type="file" accept=".csv" onChange={(event) => void handleFile(event.target.files?.[0] ?? null)} />
          <div className={styles.checkGrid}>
            <div className={errors.length ? styles.statusError : styles.statusOk}>
              <strong>{t.dataPanel.checks}</strong>
              <span>{errors.length ? errors.join("; ") : t.dataPanel.mandatoryPass}</span>
            </div>
            <div className={styles.statusOk}>
              <strong>{t.dataPanel.unused}</strong>
              <span>{unusedColumns.length ? unusedColumns.join(", ") : t.dataPanel.noneDetected}</span>
            </div>
            <div className={missingRequiredRows || missingAgeRows || negativeAgeRows ? styles.statusError : styles.statusOk}>
              <strong>{t.dataPanel.quality}</strong>
              <span>{t.dataPanel.missingMandatory}: {missingRequiredRows}; {t.dataPanel.missingAge}: {missingAgeRows}; {t.dataPanel.negativeAges}: {negativeAgeRows}.</span>
            </div>
          </div>
          <h2>{t.dataPanel.uploaded}</h2>
          <DataPreview rows={cases} />
        </article>

        <article className={styles.panel}>
          <h2>{t.dataPanel.structure}</h2>
          <p className={styles.referenceIntro}>
            {t.dataPanel.structureIntro}
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>{t.dataPanel.field}</th>
                  <th>{t.dataPanel.required}</th>
                  <th>{t.dataPanel.type}</th>
                  <th>{t.dataPanel.definition}</th>
                </tr>
              </thead>
              <tbody>
                {expectedFields.map((field) => (
                  <tr key={field.name}>
                    <td>{field.name}</td>
                    <td>{fieldRequiredText(field, language)}</td>
                    <td>{field.type}</td>
                    <td>{fieldDescriptionText(field, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
