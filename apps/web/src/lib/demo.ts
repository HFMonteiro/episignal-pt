import type { CaseRecord, DemoSummary, WeeklyResult } from "./types";
import { syntheticMunicipalitiesByDistrict } from "./ptMunicipalities";

const sampleStartDate = "2020-01-06";
const sampleWeeks = 220;

function mondayAfterWeeks(startDate: string, offset: number): string {
  const date = new Date(`${startDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset * 7);
  return date.toISOString().slice(0, 10);
}

const baselineDates = Array.from({ length: sampleWeeks }, (_, index) => mondayAfterWeeks(sampleStartDate, index));

const ptDistricts = [
  { district: "Viana do Castelo", district_id: "16", region: "Norte", region_id: "PT11", municipality: "Viana do Castelo", age: 8, age_group: "05-09", sex: "female", population: 245000 },
  { district: "Braga", district_id: "03", region: "Norte", region_id: "PT11", municipality: "Braga", age: 3, age_group: "00-04", sex: "male", population: 910000 },
  { district: "Vila Real", district_id: "17", region: "Norte", region_id: "PT11", municipality: "Vila Real", age: 12, age_group: "10-14", sex: "male", population: 180000 },
  { district: "Braganca", district_id: "04", region: "Norte", region_id: "PT11", municipality: "Braganca", age: 28, age_group: "25-34", sex: "female", population: 135000 },
  { district: "Porto", district_id: "13", region: "Norte", region_id: "PT11", municipality: "Porto", age: 3, age_group: "00-04", sex: "male", population: 1800000 },
  { district: "Aveiro", district_id: "01", region: "Centro", region_id: "PT16", municipality: "Aveiro", age: 38, age_group: "35-44", sex: "female", population: 735000 },
  { district: "Viseu", district_id: "18", region: "Centro", region_id: "PT16", municipality: "Viseu", age: 43, age_group: "40-44", sex: "male", population: 370000 },
  { district: "Guarda", district_id: "09", region: "Centro", region_id: "PT16", municipality: "Guarda", age: 61, age_group: "55-64", sex: "female", population: 170000 },
  { district: "Coimbra", district_id: "06", region: "Centro", region_id: "PT16", municipality: "Coimbra", age: 47, age_group: "45-54", sex: "female", population: 430000 },
  { district: "Castelo Branco", district_id: "05", region: "Centro", region_id: "PT16", municipality: "Castelo Branco", age: 76, age_group: "75-84", sex: "male", population: 190000 },
  { district: "Leiria", district_id: "10", region: "Centro", region_id: "PT16", municipality: "Leiria", age: 22, age_group: "20-24", sex: "diverse", population: 500000 },
  { district: "Santarem", district_id: "14", region: "Lisboa e Vale do Tejo", region_id: "PT17", municipality: "Santarem", age: 33, age_group: "30-34", sex: "female", population: 450000 },
  { district: "Portalegre", district_id: "12", region: "Alentejo", region_id: "PT18", municipality: "Portalegre", age: 87, age_group: "85+", sex: "unknown", population: 110000 },
  { district: "Lisboa", district_id: "11", region: "Lisboa e Vale do Tejo", region_id: "PT17", municipality: "Lisboa", age: 31, age_group: "25-34", sex: "female", population: 2200000 },
  { district: "Evora", district_id: "07", region: "Alentejo", region_id: "PT18", municipality: "Evora", age: 68, age_group: "65-74", sex: "unknown", population: 170000 },
  { district: "Setubal", district_id: "15", region: "Lisboa e Vale do Tejo", region_id: "PT17", municipality: "Setubal", age: 51, age_group: "50-54", sex: "male", population: 890000 },
  { district: "Beja", district_id: "02", region: "Alentejo", region_id: "PT18", municipality: "Beja", age: 17, age_group: "15-24", sex: "female", population: 150000 },
  { district: "Faro", district_id: "08", region: "Algarve", region_id: "PT15", municipality: "Faro", age: 52, age_group: "45-54", sex: "male", population: 470000 }
];

const pathogens = ["Pertussis", "Measles"];
const districtPopulationLookup = new Map<string, number>(
  ptDistricts.flatMap((area) => [
    [area.district_id, area.population] as [string, number],
    [area.district, area.population] as [string, number]
  ])
);
// Synthetic reference population for the bundled demo dataset only.
const syntheticNationalPopulation = ptDistricts.reduce((sum, area) => sum + area.population, 0);

export type Language = "pt" | "en";

export type DenominatorResolution = {
  population: number | null;
  note: string | null;
};

export function makeDemoCases(): CaseRecord[] {
  const rows: CaseRecord[] = [];

  function addCases(date: string, count: number, area: typeof ptDistricts[number], age_group: string, sex: string, status: string, prefix: string, pathogen = "Pertussis") {
    const age = age_group === "00-04" ? 3 : age_group === "40-44" ? 42 : age_group === "45-54" ? 49 : area.age;
    const municipalities = syntheticMunicipalitiesByDistrict[area.district] ?? [];
    for (let index = 0; index < count; index += 1) {
      const municipality = municipalities.length
        ? municipalities[(index + date.charCodeAt(8) + prefix.length) % municipalities.length]
        : { municipality: area.municipality, municipality_id: undefined };
      rows.push({
        case_id: `${prefix}-${date}-${area.district_id}-${index + 1}`,
        date_report: date,
        country: "Portugal",
        country_id: "PT",
        region: area.region,
        region_id: area.region_id,
        district: area.district,
        district_id: area.district_id,
        municipality: municipality.municipality,
        municipality_id: municipality.municipality_id,
        pathogen,
        age,
        age_group,
        sex,
        outbreak_status: status
      });
    }
  }

  baselineDates.slice(0, -6).forEach((date, weekIndex) => {
    pathogens.forEach((pathogen, pathogenIndex) => {
      const baselineCount = pathogen === "Pertussis" ? 3 + (weekIndex % 3) : 1 + (weekIndex % 2);
      for (let index = 0; index < baselineCount; index += 1) {
        const area = ptDistricts[(weekIndex * 5 + index * 3 + pathogenIndex) % ptDistricts.length];
        addCases(date, 1, area, area.age_group, area.sex, "no", `pt-baseline-${pathogen.toLowerCase()}`, pathogen);
      }
    });
  });

  const detectionDates = baselineDates.slice(-6);
  detectionDates.forEach((date, weekIndex) => {
    addCases(date, weekIndex === 5 ? 11 : 7, ptDistricts[4], "00-04", weekIndex === 5 ? "unknown" : weekIndex % 2 === 0 ? "male" : "female", weekIndex >= 4 ? "yes" : "no", "pt-porto-infant");
    addCases(date, weekIndex === 5 ? 6 : 2, ptDistricts[13], "40-44", weekIndex === 5 ? "unknown" : weekIndex % 2 === 0 ? "female" : "male", weekIndex >= 4 ? "yes" : "no", "pt-lisboa-adult");
    addCases(date, weekIndex === 5 ? 3 : 1, ptDistricts[8], "55-64", "female", "no", "pt-coimbra-older");
    addCases(date, 1, ptDistricts[16], "15-24", "female", "no", "pt-beja-young");
    addCases(date, 1, ptDistricts[17], "65-74", "diverse", "no", "pt-faro-diverse");
    addCases(date, weekIndex === 5 ? 5 : 2, ptDistricts[17], "10-14", weekIndex % 2 === 0 ? "male" : "female", weekIndex === 5 ? "yes" : "no", "pt-measles-faro", "Measles");
    addCases(date, 1, ptDistricts[0], "05-09", "female", "no", "pt-measles-viana", "Measles");
  });

  return rows;
}

export function resolveCrudeDenominator(
  datasetSource: "demo" | "upload",
  selectedDistrict: string,
  selectedSex: string,
  language: Language
): DenominatorResolution {
  const note = {
    pt: {
      upload: "A taxa bruta por 100 mil não é calculada para uploads sem uma tabela de população explícita.",
      sex: "A taxa bruta por 100 mil não é calculada para estratificação por sexo porque falta um denominador sexo-específico.",
      district: (district: string) => `Taxa bruta por 100 mil calculada com denominador de referência sintético para o distrito ${district}.`,
      national: "Taxa bruta por 100 mil calculada com denominador de referência da amostra de demonstração."
    },
    en: {
      upload: "The crude rate per 100k is not computed for uploads without an explicit population table.",
      sex: "The crude rate per 100k is not computed for sex stratification because a sex-specific denominator is not available.",
      district: (district: string) => `Crude rate per 100k computed with the synthetic reference denominator for district ${district}.`,
      national: "Crude rate per 100k computed with the demonstration reference denominator."
    }
  }[language];

  if (datasetSource !== "demo") {
    return { population: null, note: note.upload };
  }

  if (selectedSex !== "All") {
    return { population: null, note: note.sex };
  }

  if (selectedDistrict === "All") {
    return { population: syntheticNationalPopulation, note: note.national };
  }

  const population = districtPopulationLookup.get(selectedDistrict) ?? null;
  if (population === null) {
    return {
      population: null,
      note:
        language === "pt"
          ? `Sem denominador de referência para o distrito ${selectedDistrict}.`
          : `No reference denominator is available for district ${selectedDistrict}.`
    };
  }

  return { population, note: note.district(selectedDistrict) };
}

export function parseCsv(text: string): CaseRecord[] {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map((value) => value.trim());
  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(",").map((value) => value.trim());
      const record = headers.reduce<Record<string, string>>((current, header, index) => {
        current[header] = values[index] ?? "";
        return current;
      }, {});
      return {
        case_id: record.case_id ?? "",
        date_report: record.date_report ?? "",
        country: record.country ?? "",
        country_id: record.country_id ?? "",
        region: record.region || undefined,
        region_id: record.region_id || undefined,
        district: record.district || undefined,
        district_id: record.district_id || undefined,
        municipality: record.municipality || undefined,
        municipality_id: record.municipality_id || undefined,
        pathogen: record.pathogen ?? "",
        age: record.age ? Number(record.age) : undefined,
        age_group: record.age_group || undefined,
        sex: record.sex || undefined,
        outbreak_status: record.outbreak_status || undefined
      };
    });
}

export function validateCases(rows: CaseRecord[]): string[] {
  const errors: string[] = [];
  const required = ["case_id", "date_report", "country", "country_id", "pathogen"] as const;

  if (rows.length === 0) {
    return ["No rows found in the dataset"];
  }

  for (const column of required) {
    if (rows.some((row) => !row[column])) {
      errors.push(`Missing required value in ${column}`);
    }
  }

  if (rows.every((row) => row.age === undefined && !row.age_group)) {
    errors.push("Dataset must include age or age_group");
  }

  const ids = new Set<string>();
  for (const row of rows) {
    if (ids.has(row.case_id)) {
      errors.push("Duplicate case_id in data");
      break;
    }
    ids.add(row.case_id);
  }

  return errors;
}

function isoYearWeek(dateText: string): { year: number; week: number } {
  const date = new Date(`${dateText}T00:00:00Z`);
  const target = new Date(date.valueOf());
  const day = (date.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDay = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3);
  const week = 1 + Math.round((target.valueOf() - firstThursday.valueOf()) / 604800000);
  return { year: target.getUTCFullYear(), week };
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}

function standardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const avg = mean(values);
  const variance = values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

function clampAlpha(alpha: number): number {
  if (!Number.isFinite(alpha)) return 0.05;
  return Math.min(0.2, Math.max(0.001, alpha));
}

function inverseNormalQuantile(probability: number): number {
  if (probability <= 0) return Number.NEGATIVE_INFINITY;
  if (probability >= 1) return Number.POSITIVE_INFINITY;

  const a1 = -39.69683028665376;
  const a2 = 220.9460984245205;
  const a3 = -275.9285104469687;
  const a4 = 138.357751867269;
  const a5 = -30.66479806614716;
  const a6 = 2.506628277459239;

  const b1 = -54.47609879822406;
  const b2 = 161.5858368580409;
  const b3 = -155.6989798598866;
  const b4 = 66.80131188771972;
  const b5 = -13.28068155288572;

  const c1 = -0.007784894002430293;
  const c2 = -0.3223964580411365;
  const c3 = -2.400758277161838;
  const c4 = -2.549732539343734;
  const c5 = 4.374664141464968;
  const c6 = 2.938163982698783;

  const d1 = 0.007784695709041462;
  const d2 = 0.3224671290700398;
  const d3 = 2.445134137142996;
  const d4 = 3.754408661907416;

  const plow = 0.02425;
  const phigh = 1 - plow;

  if (probability < plow) {
    const q = Math.sqrt(-2 * Math.log(probability));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      (((((d1 * q + d2) * q + d3) * q + d4) * q) + 1);
  }

  if (probability > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - probability));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      (((((d1 * q + d2) * q + d3) * q + d4) * q) + 1);
  }

  const q = probability - 0.5;
  const r = q * q;
  return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
    (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
}

export function runDemoModel(
  rows: CaseRecord[],
  detectionWeeks = 3,
  alphaUpper = 0.05,
  denominatorPopulation: number | null = null
): WeeklyResult[] {
  const buckets = new Map<string, WeeklyResult>();
  const zScore = inverseNormalQuantile(1 - clampAlpha(alphaUpper));

  for (const row of rows) {
    const { year, week } = isoYearWeek(row.date_report);
    const key = `${year}-${week}`;
    const current = buckets.get(key) ?? {
      year,
      week,
      cases: 0,
      alarm: null,
      upperbound: null,
      expected: null,
      population: denominatorPopulation,
      ratePer100k: null
    };
    current.cases += 1;
    buckets.set(key, current);
  }

  const series = [...buckets.values()]
    .sort((a, b) => a.year - b.year || a.week - b.week)
    .map((row) => ({
      ...row,
      ratePer100k: row.population !== null && row.population > 0 ? (row.cases / row.population) * 100000 : null
    }));
  const start = Math.max(0, series.length - detectionWeeks);

  for (let index = start; index < series.length; index += 1) {
    const baseline = series.slice(Math.max(0, index - 7), index).map((row) => row.cases);
    if (baseline.length === 0) {
      series[index] = {
        ...series[index],
        expected: null,
        upperbound: null,
        alarm: null
      };
      continue;
    }

    const expected = mean(baseline);
    const upperbound = expected + zScore * standardDeviation(baseline);
    series[index] = {
      ...series[index],
      expected,
      upperbound,
      alarm: series[index].cases > upperbound
    };
  }

  return series;
}

export function summarize(
  rows: CaseRecord[],
  results: WeeklyResult[],
  detectionWeeks: number,
  denominatorPopulation: number | null = null
): DemoSummary {
  const latestRatePer100k = results[results.length - 1]?.ratePer100k ?? null;

  return {
    rows: rows.length,
    weeks: results.length,
    detectionWeeks,
    signals: results.filter((row) => row.alarm).length,
    cases: results.reduce((sum, row) => sum + row.cases, 0),
    population: denominatorPopulation,
    latestRatePer100k
  };
}

export function toCsv(rows: CaseRecord[]): string {
  const headers = [
    "case_id",
    "date_report",
    "country",
    "country_id",
    "region",
    "region_id",
    "district",
    "district_id",
    "municipality",
    "municipality_id",
    "pathogen",
    "age",
    "age_group",
    "sex",
    "outbreak_status"
  ];
  return [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header as keyof CaseRecord];
          return value === undefined ? "" : String(value);
        })
        .join(",")
    )
  ].join("\n");
}

