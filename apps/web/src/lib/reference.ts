export const expectedFields = [
  {
    name: "case_id",
    required: "Yes",
    requiredPt: "Sim",
    type: "string | number",
    description: "Unique pseudonymous case identifier. Do not upload national identifiers or direct patient identifiers.",
    descriptionPt: "Identificador pseudónimo único do caso. Não carregues identificadores nacionais nem identificadores diretos de doentes."
  },
  {
    name: "date_report",
    required: "Yes",
    requiredPt: "Sim",
    type: "YYYY-MM-DD",
    description: "Reporting date used to derive ISO year/week for aggregation.",
    descriptionPt: "Data de notificação usada para derivar ano/semana ISO na agregação."
  },
  {
    name: "country",
    required: "Yes",
    requiredPt: "Sim",
    type: "string",
    description: "Reporting country name.",
    descriptionPt: "Nome do país notificador."
  },
  {
    name: "country_id",
    required: "Yes",
    requiredPt: "Sim",
    type: "string | number",
    description: "Country code, preferably ISO alpha-3 or NUTS-0.",
    descriptionPt: "Código do país, preferencialmente ISO alpha-3 ou NUTS-0."
  },
  {
    name: "pathogen",
    required: "Yes",
    requiredPt: "Sim",
    type: "string",
    description: "Pathogen, disease, diagnosis, serovar, or surveillance topic under analysis.",
    descriptionPt: "Agente, doença, diagnóstico, serovar ou tópico de vigilância em análise."
  },
  {
    name: "age / age_group",
    required: "One required",
    requiredPt: "Um obrigatório",
    type: "integer | interval",
    description: "Either integer age 0-114 or age interval such as 00-04, 05-09, 85+.",
    descriptionPt: "Idade inteira entre 0 e 114 ou intervalo etário, por exemplo 00-04, 05-09, 85+."
  },
  {
    name: "sex",
    required: "No",
    requiredPt: "Não",
    type: "male | female | diverse | unknown",
    description: "Optional stratification/filter variable.",
    descriptionPt: "Variável opcional de estratificação/filtro."
  },
  {
    name: "district / district_id / municipality",
    required: "No",
    requiredPt: "Não",
    type: "string | number",
    description: "Regional variables for maps and stratification. The demo uses Portuguese districts such as Porto, Lisboa, Coimbra and Faro.",
    descriptionPt: "Variáveis territoriais para mapas e estratificação. A demo usa distritos portugueses como Porto, Lisboa, Coimbra e Faro."
  },
  {
    name: "outbreak_status",
    required: "No",
    requiredPt: "Não",
    type: "yes | no | unknown",
    description: "Optional flag for known outbreak cases. Signal detection itself is based on observed case counts.",
    descriptionPt: "Flag opcional para casos de surto conhecido. A deteção de sinais é calculada a partir das contagens observadas."
  }
];

export const supabaseTables = [
  {
    name: "projects",
    purpose: "Logical workspace owned by a user or team.",
    sensitive: "Low"
  },
  {
    name: "datasets",
    purpose: "Metadata for uploaded line-list files in private Storage.",
    sensitive: "High metadata"
  },
  {
    name: "analysis_jobs",
    purpose: "Method, parameters, state, and execution audit trail.",
    sensitive: "Medium"
  },
  {
    name: "signal_results",
    purpose: "Weekly aggregated results: cases, alarms, expected values, thresholds, denominators and crude rates when an explicit population reference is available.",
    sensitive: "Aggregated"
  },
  {
    name: "report_artifacts",
    purpose: "Links to generated HTML/Word/CSV/JSON outputs in private Storage.",
    sensitive: "Depends on artifact"
  }
];

export const vercelStructure = [
  {
    path: "apps/web",
    role: "Next.js app hosted on Vercel. Handles UI, upload flow, parameter selection, result review, and exports."
  },
  {
    path: "migration/supabase",
    role: "SQL schema, RLS policies, and private Storage bucket definitions."
  },
  {
    path: "migration/python-worker",
    role: "FastAPI/Python prototype for validation, preprocessing, ISO aggregation, EARS and CUSUM."
  },
  {
    path: "R/",
    role: "Original validated R package logic. Keep FarringtonFlexible, GLM, reports here until parity tests exist."
  }
];
