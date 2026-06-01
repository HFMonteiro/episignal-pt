export const expectedFields = [
  {
    name: "case_id",
    required: "Yes",
    type: "string | number",
    description: "Unique pseudonymous case identifier. Do not upload national identifiers or direct patient identifiers."
  },
  {
    name: "date_report",
    required: "Yes",
    type: "YYYY-MM-DD",
    description: "Reporting date used to derive ISO year/week for aggregation."
  },
  {
    name: "country",
    required: "Yes",
    type: "string",
    description: "Reporting country name."
  },
  {
    name: "country_id",
    required: "Yes",
    type: "string | number",
    description: "Country code, preferably ISO alpha-3 or NUTS-0."
  },
  {
    name: "pathogen",
    required: "Yes",
    type: "string",
    description: "Pathogen, disease, diagnosis, serovar, or surveillance topic under analysis."
  },
  {
    name: "age / age_group",
    required: "One required",
    type: "integer | interval",
    description: "Either integer age 0-114 or age interval such as 00-04, 05-09, 85+."
  },
  {
    name: "sex",
    required: "No",
    type: "male | female | diverse | unknown",
    description: "Optional stratification/filter variable."
  },
  {
    name: "district / district_id / municipality",
    required: "No",
    type: "string | number",
    description: "Regional variables for maps and stratification. The demo uses Portuguese districts such as Porto, Lisboa, Coimbra and Faro."
  },
  {
    name: "outbreak_status",
    required: "No",
    type: "yes | no | unknown",
    description: "Optional flag for known outbreak cases. Signal detection itself is based on observed case counts."
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
