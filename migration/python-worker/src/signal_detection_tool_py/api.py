from __future__ import annotations

import io

import pandas as pd
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse

from .algorithms import METHOD_PARITY_STATUS, SignalDetectionConfig, run_signal_detection
from .r_bridge import RWorkerBridgeError
from .schema import check_raw_surveillance_data

app = FastAPI(title="Signal Detection Tool Python Worker", version="0.1.0")


INDEX_HTML = """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Signal Detection Tool</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7f9;
      --panel: #ffffff;
      --panel-2: #eef3f6;
      --text: #15202b;
      --muted: #667085;
      --line: #d8e0e6;
      --accent: #0f766e;
      --accent-2: #164e63;
      --danger: #b42318;
      --warn: #b54708;
      --ok: #067647;
      --shadow: 0 18px 48px rgba(16, 24, 40, .10);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    header {
      border-bottom: 1px solid var(--line);
      background: #fff;
    }
    .shell {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
    }
    .topbar {
      min-height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .mark {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      display: grid;
      place-items: center;
      color: #fff;
      font-weight: 800;
      letter-spacing: 0;
    }
    h1 {
      margin: 0;
      font-size: 20px;
      line-height: 1.2;
      letter-spacing: 0;
    }
    .subtitle {
      margin-top: 3px;
      font-size: 13px;
      color: var(--muted);
    }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
      font-size: 13px;
      color: var(--muted);
      white-space: nowrap;
    }
    .top-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .lang-toggle {
      display: inline-flex;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
      overflow: hidden;
    }
    .lang-toggle button {
      min-height: 32px;
      border-radius: 0;
      padding: 6px 10px;
      background: #fff;
      color: var(--muted);
      font-size: 13px;
    }
    .lang-toggle button.active {
      background: var(--accent);
      color: #fff;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--warn);
    }
    .dot.ok { background: var(--ok); }
    main {
      padding: 28px 0 44px;
    }
    .grid {
      display: grid;
      grid-template-columns: 360px minmax(0, 1fr);
      gap: 20px;
      align-items: start;
    }
    .panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
    .panel h2 {
      margin: 0;
      padding: 18px 18px 0;
      font-size: 16px;
      letter-spacing: 0;
    }
    .panel-body {
      padding: 18px;
    }
    label {
      display: block;
      margin-bottom: 7px;
      font-size: 13px;
      font-weight: 650;
      color: #344054;
    }
    input[type="file"],
    select,
    input[type="number"] {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
      color: var(--text);
      min-height: 42px;
      padding: 9px 10px;
      font: inherit;
      font-size: 14px;
    }
    .field { margin-bottom: 15px; }
    .hint {
      margin-top: 7px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.45;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 18px;
    }
    button {
      border: 0;
      border-radius: 8px;
      padding: 10px 13px;
      min-height: 42px;
      font: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
    .primary {
      background: var(--accent);
      color: #fff;
      flex: 1;
    }
    .secondary {
      background: var(--panel-2);
      color: var(--accent-2);
    }
    button:disabled {
      opacity: .55;
      cursor: not-allowed;
    }
    .notice {
      margin-top: 16px;
      border-radius: 8px;
      padding: 11px 12px;
      font-size: 13px;
      line-height: 1.45;
      background: #ecfdf3;
      color: #075e45;
      border: 1px solid #abefc6;
    }
    .notice.error {
      background: #fef3f2;
      color: var(--danger);
      border-color: #fecdca;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }
    .metric {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 13px;
      background: #fff;
    }
    .metric .value {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.1;
    }
    .metric .label {
      margin-top: 5px;
      color: var(--muted);
      font-size: 12px;
    }
    .empty {
      min-height: 360px;
      display: grid;
      place-items: center;
      text-align: center;
      color: var(--muted);
      padding: 40px 24px;
    }
    .empty strong {
      display: block;
      margin-bottom: 7px;
      color: #344054;
      font-size: 15px;
    }
    .chart-wrap {
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
      margin-bottom: 18px;
    }
    svg {
      display: block;
      width: 100%;
      height: 260px;
    }
    .table-wrap {
      max-height: 430px;
      overflow: auto;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fff;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th, td {
      padding: 10px 11px;
      border-bottom: 1px solid var(--line);
      text-align: left;
      white-space: nowrap;
    }
    th {
      position: sticky;
      top: 0;
      background: #f8fafc;
      color: #344054;
      z-index: 1;
      font-size: 12px;
    }
    .alarm {
      color: var(--danger);
      font-weight: 800;
    }
    .muted { color: var(--muted); }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .topbar { align-items: flex-start; flex-direction: column; padding: 16px 0; }
      .top-actions { width: 100%; justify-content: space-between; }
    }
  </style>
</head>
<body>
  <header>
    <div class="shell topbar">
      <div class="brand">
        <div class="mark">SD</div>
        <div>
          <h1>Signal Detection Tool</h1>
          <div class="subtitle" data-i18n="subtitle">Local analytics worker for epidemiological signal detection</div>
        </div>
      </div>
      <div class="top-actions">
        <div class="lang-toggle" aria-label="Language selector">
          <button id="langPt" type="button">PT</button>
          <button id="langEn" type="button" class="active">EN</button>
        </div>
        <div class="status"><span id="healthDot" class="dot"></span><span id="healthText" data-i18n="checkingApi">Checking API</span></div>
      </div>
    </div>
  </header>
  <main class="shell">
    <div class="grid">
      <section class="panel">
        <h2 data-i18n="runAnalysis">Run analysis</h2>
        <div class="panel-body">
          <form id="analysisForm">
            <div class="field">
              <label for="file" data-i18n="lineListFile">Line-list file</label>
              <input id="file" name="file" type="file" accept=".csv,.xlsx,.xls" required />
              <div class="hint" data-i18n="requiredFields">Required fields: case_id, date_report, country, country_id, pathogen, and age or age_group.</div>
            </div>
            <div class="field">
              <label for="method" data-i18n="method">Method</label>
              <select id="method" name="method">
                <option value="ears">EARS</option>
                <option value="cusum">CUSUM</option>
                <option value="farrington">FarringtonFlexible</option>
                <option value="glm">GLM mean</option>
              </select>
              <div class="hint" data-i18n="methodHint">FarringtonFlexible and GLM run through the local R bridge once there is enough history. GLM defaults to the mean model.</div>
            </div>
            <div class="field">
              <label for="weeks" data-i18n="detectionPeriod">Detection period</label>
              <input id="weeks" name="weeks" type="number" min="1" max="52" value="6" />
            </div>
            <div class="field">
              <label for="alphaUpper" data-i18n="alphaUpper">Upper alpha</label>
              <input id="alphaUpper" name="alpha_upper" type="number" min="0.001" max="0.2" step="0.001" value="0.05" />
              <div class="hint" data-i18n="alphaHint">Used by FarringtonFlexible and GLM. EARS and CUSUM ignore this value in the underlying R package.</div>
            </div>
            <div class="actions">
              <button id="runButton" class="primary" type="submit" data-i18n="runDetection">Run detection</button>
              <button class="secondary" type="button" id="sampleButton" data-i18n="loadSample">Load sample</button>
            </div>
          </form>
          <div id="message" class="notice" hidden></div>
        </div>
      </section>
      <section class="panel">
        <h2 data-i18n="resultsTitle">Results</h2>
        <div class="panel-body" id="results">
          <div class="empty">
            <div>
              <strong data-i18n="noAnalysis">No analysis yet</strong>
              <span data-i18n="emptyText">Upload a CSV/XLSX line list or load the synthetic sample to run the worker.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  <script>
    const form = document.getElementById('analysisForm');
    const fileInput = document.getElementById('file');
    const methodInput = document.getElementById('method');
    const weeksInput = document.getElementById('weeks');
    const alphaInput = document.getElementById('alphaUpper');
    const runButton = document.getElementById('runButton');
    const sampleButton = document.getElementById('sampleButton');
    const message = document.getElementById('message');
    const results = document.getElementById('results');
    const healthDot = document.getElementById('healthDot');
    const healthText = document.getElementById('healthText');
    const langPt = document.getElementById('langPt');
    const langEn = document.getElementById('langEn');
    let currentLang = 'en';
    const i18n = {
      en: {
        subtitle: 'Local analytics worker for epidemiological signal detection',
        checkingApi: 'Checking API',
        apiReady: 'API ready',
        apiUnavailable: 'API unavailable',
        runAnalysis: 'Run analysis',
        lineListFile: 'Line-list file',
        requiredFields: 'Required fields: case_id, date_report, country, country_id, pathogen, and age or age_group.',
        method: 'Method',
        methodHint: 'FarringtonFlexible and GLM run through the local R bridge once there is enough history. GLM defaults to the mean model.',
        detectionPeriod: 'Detection period',
        alphaUpper: 'Upper alpha',
        alphaHint: 'Used by FarringtonFlexible and GLM. EARS and CUSUM ignore this value in the underlying R package.',
        runDetection: 'Run detection',
        running: 'Running...',
        loadSample: 'Load sample',
        resultsTitle: 'Results',
        noAnalysis: 'No analysis yet',
        emptyText: 'Upload a CSV/XLSX line list or load the synthetic sample to run the worker.',
        sampleLoaded: 'Synthetic CSV loaded with 220 weeks of history for EARS, CUSUM, FarringtonFlexible, and GLM. No personal or real health data is included.',
        completed: 'Analysis completed. Treat this Python output as prototype until parity against R is complete.',
        selectFile: 'Select a CSV/XLSX file first.',
        noResults: 'No results',
        noResultsText: 'The selected method did not have enough calibration history.',
        weeksReturned: 'weeks returned',
        detectionWeeks: 'detection weeks',
        signals: 'signals',
        cases: 'cases',
        latestWeek: 'Latest week',
        latestCases: 'latest cases',
        chartLabel: 'Weekly cases and threshold'
      },
      pt: {
        subtitle: 'Worker analítico local para deteção de sinais epidemiológicos',
        checkingApi: 'A verificar API',
        apiReady: 'API pronta',
        apiUnavailable: 'API indisponível',
        runAnalysis: 'Executar análise',
        lineListFile: 'Ficheiro de line list',
        requiredFields: 'Campos obrigatórios: case_id, date_report, country, country_id, pathogen, e age ou age_group.',
        method: 'Método',
        methodHint: 'FarringtonFlexible e GLM correm através do bridge R local quando existe histórico suficiente. O GLM usa o modelo mean por defeito.',
        detectionPeriod: 'Período de deteção',
        alphaUpper: 'Alfa superior',
        alphaHint: 'É usado pelo FarringtonFlexible e pelo GLM. O EARS e o CUSUM ignoram este valor no pacote R subjacente.',
        runDetection: 'Executar deteção',
        running: 'A executar...',
        loadSample: 'Carregar exemplo',
        resultsTitle: 'Resultados',
        noAnalysis: 'Ainda sem análise',
        emptyText: 'Carrega uma line list CSV/XLSX ou usa o exemplo sintético para executar o worker.',
        sampleLoaded: 'CSV sintético carregado com 220 semanas de histórico para EARS, CUSUM, FarringtonFlexible e GLM. Não inclui dados pessoais nem dados reais de saúde.',
        completed: 'Análise concluída. Trata este output Python como protótipo até haver paridade com R.',
        selectFile: 'Seleciona primeiro um ficheiro CSV/XLSX.',
        noResults: 'Sem resultados',
        noResultsText: 'O método selecionado não tinha histórico suficiente para calibração.',
        weeksReturned: 'semanas devolvidas',
        detectionWeeks: 'semanas de deteção',
        signals: 'sinais',
        cases: 'casos',
        latestWeek: 'Última semana',
        latestCases: 'casos na última semana',
        chartLabel: 'Casos semanais e limiar'
      }
    };

    function t(key) {
      return i18n[currentLang][key] || i18n.en[key] || key;
    }

    function applyLanguage(lang) {
      currentLang = lang;
      document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
      langPt.classList.toggle('active', lang === 'pt');
      langEn.classList.toggle('active', lang === 'en');
      document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
      });
      if (healthDot.classList.contains('ok')) {
        healthText.textContent = t('apiReady');
      }
    }

    langPt.addEventListener('click', () => applyLanguage('pt'));
    langEn.addEventListener('click', () => applyLanguage('en'));

    async function checkHealth() {
      try {
        const response = await fetch('/health');
        if (!response.ok) throw new Error('Health check failed');
        healthDot.classList.add('ok');
        healthText.textContent = t('apiReady');
      } catch {
        healthDot.classList.remove('ok');
        healthText.textContent = t('apiUnavailable');
      }
    }

    function setMessage(text, type = 'ok') {
      message.hidden = false;
      message.textContent = text;
      message.className = type === 'error' ? 'notice error' : 'notice';
    }

    function clearMessage() {
      message.hidden = true;
      message.textContent = '';
    }

    function sampleCsv() {
      const rows = [['case_id', 'date_report', 'country', 'country_id', 'pathogen', 'age', 'sex', 'outbreak_status']];
      const start = new Date('2020-01-06T00:00:00Z');
      const baselineWeeks = 214;
      const spikeCounts = [3, 4, 5, 6, 8, 12];

      for (let week = 0; week < baselineWeeks; week += 1) {
        const date = new Date(start);
        date.setUTCDate(date.getUTCDate() + week * 7);
        const dateText = date.toISOString().slice(0, 10);
        rows.push([
          `baseline-${week + 1}`,
          dateText,
          'Portugal',
          'PT',
          week % 4 === 0 ? 'Pertussis' : 'Example',
          String(28 + (week % 5)),
          week % 2 === 0 ? 'female' : 'male',
          'no'
        ]);
      }

      spikeCounts.forEach((count, offset) => {
        const week = baselineWeeks + offset;
        const date = new Date(start);
        date.setUTCDate(date.getUTCDate() + week * 7);
        const dateText = date.toISOString().slice(0, 10);
        for (let index = 0; index < count; index += 1) {
          rows.push([
            `spike-${offset + 1}-${index + 1}`,
            dateText,
            'Portugal',
            'PT',
            'Pertussis',
            '30',
            index % 2 === 0 ? 'female' : 'male',
            'yes'
          ]);
        }
      });

      return rows.map(row => row.join(',')).join('\\n');
    }

    sampleButton.addEventListener('click', () => {
      const file = new File([sampleCsv()], 'synthetic-signal-sample.csv', { type: 'text/csv' });
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
      weeksInput.value = 6;
      alphaInput.value = '0.05';
      setMessage(t('sampleLoaded'));
    });

    function renderSummary(rows) {
      const detectionRows = rows.filter(row => row.alarms !== null && row.alarms !== undefined);
      const alarms = detectionRows.filter(row => row.alarms === true).length;
      const totalCases = rows.reduce((sum, row) => sum + Number(row.cases || 0), 0);
      const last = rows[rows.length - 1] || {};
      return `
        <div class="summary">
          <div class="metric"><div class="value">${rows.length}</div><div class="label">${t('weeksReturned')}</div></div>
          <div class="metric"><div class="value">${detectionRows.length}</div><div class="label">${t('detectionWeeks')}</div></div>
          <div class="metric"><div class="value">${alarms}</div><div class="label">${t('signals')}</div></div>
          <div class="metric"><div class="value">${totalCases}</div><div class="label">${t('cases')}</div></div>
        </div>
        <div class="hint">${t('latestWeek')}: ${last.year || 'n/a'}-${last.week || 'n/a'} · ${t('latestCases')}: ${last.cases ?? 'n/a'}</div>
      `;
    }

    function renderChart(rows) {
      const width = 900;
      const height = 260;
      const pad = 34;
      const maxCases = Math.max(1, ...rows.map(row => Number(row.cases || 0)), ...rows.map(row => Number(row.upperbound || 0)));
      const x = index => pad + (index * (width - pad * 2)) / Math.max(1, rows.length - 1);
      const y = value => height - pad - (Number(value || 0) * (height - pad * 2)) / maxCases;
      const bars = rows.map((row, index) => {
        const barWidth = Math.max(3, (width - pad * 2) / rows.length - 4);
        const bx = x(index) - barWidth / 2;
        const by = y(row.cases);
        const bh = height - pad - by;
        const color = row.alarms ? '#b42318' : '#0f766e';
        return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${Math.max(1, bh).toFixed(1)}" fill="${color}" rx="2"></rect>`;
      }).join('');
      const threshold = rows
        .filter(row => row.upperbound !== null && row.upperbound !== undefined)
        .map((row, index) => `${index === 0 ? 'M' : 'L'} ${x(rows.indexOf(row)).toFixed(1)} ${y(row.upperbound).toFixed(1)}`)
        .join(' ');
      return `
        <div class="chart-wrap">
          <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t('chartLabel')}">
            <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#d8e0e6"></line>
            <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#d8e0e6"></line>
            ${bars}
            ${threshold ? `<path d="${threshold}" fill="none" stroke="#164e63" stroke-width="2.5"></path>` : ''}
          </svg>
        </div>
      `;
    }

    function renderTable(rows) {
      const body = rows.map(row => `
        <tr>
          <td>${row.year}</td>
          <td>${row.week}</td>
          <td>${row.cases}</td>
          <td class="${row.alarms ? 'alarm' : 'muted'}">${row.alarms === null || row.alarms === undefined ? '' : row.alarms}</td>
          <td>${row.upperbound === null || row.upperbound === undefined ? '' : Number(row.upperbound).toFixed(2)}</td>
          <td>${row.category || ''}</td>
          <td>${row.stratum || ''}</td>
        </tr>
      `).join('');
      return `
        <div class="table-wrap">
          <table>
            <thead><tr><th>Year</th><th>Week</th><th>Cases</th><th>Signal</th><th>Upper bound</th><th>Category</th><th>Stratum</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;
    }

    function renderResults(payload) {
      if (!payload.valid) {
        results.innerHTML = '<div class="notice error">' + payload.errors.join('<br>') + '</div>';
        return;
      }
      const rows = payload.results || [];
      if (!rows.length) {
        results.innerHTML = `<div class="empty"><div><strong>${t('noResults')}</strong>${t('noResultsText')}</div></div>`;
        return;
      }
      results.innerHTML = renderSummary(rows) + renderChart(rows) + renderTable(rows);
    }

    form.addEventListener('submit', async event => {
      event.preventDefault();
      clearMessage();
      if (!fileInput.files.length) {
        setMessage(t('selectFile'), 'error');
        return;
      }
      runButton.disabled = true;
      runButton.textContent = t('running');
      try {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const response = await fetch(`/signals?method=${encodeURIComponent(methodInput.value)}&number_of_weeks=${encodeURIComponent(weeksInput.value)}&alpha_upper=${encodeURIComponent(alphaInput.value)}`, {
          method: 'POST',
          body: formData
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.detail || 'Analysis failed');
        renderResults(payload);
        setMessage(t('completed'));
      } catch (error) {
        setMessage(error.message, 'error');
      } finally {
        runButton.disabled = false;
        runButton.textContent = t('runDetection');
      }
    });

    applyLanguage('en');
    checkHealth();
  </script>
</body>
</html>
"""


def _read_upload(file: UploadFile) -> pd.DataFrame:
    content = file.file.read()
    suffix = (file.filename or "").lower()
    buffer = io.BytesIO(content)
    if suffix.endswith(".csv"):
        return pd.read_csv(buffer)
    if suffix.endswith((".xlsx", ".xls")):
        return pd.read_excel(buffer)
    raise HTTPException(status_code=400, detail="Only CSV/XLS/XLSX uploads are supported")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/methods")
def methods() -> dict[str, object]:
    return {
        "native_methods": ["ears", "cusum"],
        "r_worker_methods": ["farrington", "glm"],
        "available_methods": ["ears", "cusum", "farrington", "glm"],
        "parity_status": METHOD_PARITY_STATUS,
        "operational_warning": "Native Python outputs remain prototype. FarringtonFlexible and GLM are served through the local R bridge using the installed SignalDetectionTool package.",
    }


@app.get("/", response_class=RedirectResponse)
def index() -> RedirectResponse:
    return RedirectResponse("/ui", status_code=307)


@app.get("/ui", response_class=HTMLResponse)
def ui() -> HTMLResponse:
    return HTMLResponse(INDEX_HTML)


@app.post("/validate")
def validate(file: UploadFile = File(...)) -> dict[str, object]:
    data = _read_upload(file)
    errors = check_raw_surveillance_data(data)
    return {"valid": not errors, "errors": errors, "rows": int(len(data))}


@app.post("/signals")
def signals(
    method: str = "ears",
    number_of_weeks: int = 6,
    alpha_upper: float = 0.05,
    file: UploadFile = File(...),
) -> dict[str, object]:
    method = method.strip().lower()
    if method == "glm mean":
        method = "glm"
    if method not in METHOD_PARITY_STATUS:
        raise HTTPException(status_code=400, detail="Supported methods are ears, cusum, farrington, and glm")
    data = _read_upload(file)
    errors = check_raw_surveillance_data(data)
    if errors:
        return {"valid": False, "errors": errors, "results": []}

    config = SignalDetectionConfig(method=method, number_of_weeks=number_of_weeks, alpha_upper=alpha_upper)
    try:
        results = run_signal_detection(data, config)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RWorkerBridgeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return {
        "valid": True,
        "errors": [],
        "results": results.where(pd.notna(results), None).to_dict(orient="records"),
    }
