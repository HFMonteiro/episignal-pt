#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)

usage <- paste(
  "Usage:",
  "Rscript migration/r-worker/export_golden_outputs.R input.csv output.csv method number_of_weeks [stratification_csv] [alpha_upper]",
  sep = "\n"
)

if (length(args) < 4) {
  stop(usage, call. = FALSE)
}

input_csv <- args[[1]]
output_csv <- args[[2]]
method <- args[[3]]
number_of_weeks <- as.integer(args[[4]])
stratification <- if (length(args) >= 5 && nzchar(args[[5]])) strsplit(args[[5]], ",", fixed = TRUE)[[1]] else NULL
alpha_upper <- if (length(args) >= 6 && nzchar(args[[6]])) as.numeric(args[[6]]) else 0.05

method <- tolower(method)
if (identical(method, "glm")) {
  method <- "glm mean"
}

if (is.na(number_of_weeks) || number_of_weeks < 1) {
  stop("number_of_weeks must be a positive integer", call. = FALSE)
}

if (!requireNamespace("SignalDetectionTool", quietly = TRUE)) {
  stop(
    paste(
      "SignalDetectionTool is not installed in this R library.",
      "Install the upstream package and dependencies before exporting golden outputs."
    ),
    call. = FALSE
  )
}

data <- read.csv(input_csv, stringsAsFactors = FALSE, check.names = FALSE)
preprocessed <- SignalDetectionTool::preprocess_data(data)

results <- SignalDetectionTool::get_signals_all(
  preprocessed_data = preprocessed,
  method = method,
  stratification = stratification,
  number_of_weeks = number_of_weeks,
  alpha_upper = alpha_upper
)

if (is.null(results)) {
  write.csv(data.frame(), output_csv, row.names = FALSE, na = "")
} else {
  write.csv(results, output_csv, row.names = FALSE, na = "")
}
