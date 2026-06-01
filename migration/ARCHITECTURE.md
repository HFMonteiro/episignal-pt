# Arquitetura Proposta

## Objetivo

Adaptar o `SignalDetectionTool` para uma experiência web moderna sem perder rigor estatístico. A migração deve preservar a semântica dos dados e dos algoritmos antes de redesenhar a interface.

## Componentes

### Frontend Vercel

Responsabilidades:

- upload direto para Supabase Storage com URL assinada;
- seleção de pathogen, datas, método, estratos e parâmetros;
- criação e acompanhamento de jobs;
- visualização de tabelas/gráficos com resultados persistidos;
- download de relatórios e exports.

Não deve:

- receber ficheiros grandes como payload de API;
- executar cálculo epidemiológico pesado;
- guardar chaves `service_role`.

Estrutura atual:

- `apps/web`: Next.js demo app.
- `apps/web/src/lib/demo.ts`: modelo sintético local para demonstrar o fluxo.
- `apps/web/src/lib/reference.ts`: estrutura esperada de dados, modelo Supabase e mapa Vercel/worker apresentado na UI.
- `apps/web/.env.example`: variáveis públicas para Supabase e URL do worker.

### Supabase

Responsabilidades:

- autenticação e autorização;
- metadados de projetos, datasets e jobs;
- resultados normalizados por semana/estrato;
- artefactos em Storage privado;
- RLS em todas as tabelas expostas.

Modelo inicial:

- `projects`: workspace lógico.
- `datasets`: metadados de uploads.
- `analysis_jobs`: parâmetros e estado de execução.
- `signal_results`: resultados semanais agregados.
- `report_artifacts`: relatórios e exports.
- Buckets privados: `signal-uploads`, `signal-reports`, `signal-exports`.

### Worker Analítico

Responsabilidades:

- ler ficheiros de input do Storage;
- validar schema;
- preprocessar datas, missing values e estratos;
- executar algoritmos;
- escrever resultados e artefactos;
- atualizar estado dos jobs.

Fase 1:

- Python nativo para validação, agregação, EARS e CUSUM.
- R bridge/container para FarringtonFlexible, GLM e relatórios de paridade.

Fase 2:

- Portar GLM com `statsmodels`, validando contra fixtures R.
- Avaliar port de FarringtonFlexible apenas se houver benefício claro.

## Dados e segurança

Assumir que uploads podem conter dados de saúde sensíveis. Medidas mínimas:

- Storage privado;
- caminhos de objeto prefixados por `auth.uid()`;
- RLS por owner;
- service role só no backend/worker;
- não registar linhas de dados em logs;
- definir retenção dos ficheiros raw;
- guardar apenas agregados quando possível.

## Critérios de paridade

Antes de substituir o motor R por Python para cada algoritmo:

1. Gerar fixtures a partir de `input_example` e casos sintéticos.
2. Comparar output R vs Python para:
   - validação de schema;
   - preprocessamento;
   - agregação ISO;
   - `cases`, `alarms`, `upperbound`, `expected`;
   - comportamento com missing values, estratos vazios e datas estendidas.
3. Documentar diferenças aceites.
