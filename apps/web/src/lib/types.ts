export type CaseRecord = {
  case_id: string;
  date_report: string;
  country: string;
  country_id: string;
  region?: string;
  region_id?: string;
  district?: string;
  district_id?: string;
  municipality?: string;
  municipality_id?: string;
  pathogen: string;
  age?: number;
  age_group?: string;
  sex?: string;
  outbreak_status?: string;
};

export type WeeklyResult = {
  year: number;
  week: number;
  cases: number;
  alarm: boolean | null;
  upperbound: number | null;
  expected: number | null;
  population: number | null;
  ratePer100k: number | null;
};

export type DemoSummary = {
  rows: number;
  weeks: number;
  detectionWeeks: number;
  signals: number;
  cases: number;
  population: number | null;
  latestRatePer100k: number | null;
};
