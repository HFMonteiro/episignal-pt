# Migração do Signal Detection Tool

Este diretório contém a primeira fatia de migração do `SignalDetectionTool` de Shiny/R para uma arquitetura mais adequada a Vercel + Supabase + worker analítico.

## Decisão técnica

Não é recomendável tentar correr a aplicação Shiny completa dentro da Vercel. O projeto atual é um pacote R/golem com Shiny, `surveillance`, `sf`, geração de relatórios HTML/Word e processamento de ficheiros. A Vercel deve ficar com a interface e orquestração leve; o cálculo estatístico deve correr num worker separado.

Arquitetura recomendada:

- `apps/web`: Next.js em Vercel para upload, parametrização, estado dos jobs, tabelas, gráficos e downloads.
- Supabase Auth/Postgres/Storage: utilizadores, metadados dos datasets, jobs, resultados e artefactos.
- `migration/python-worker`: worker analítico em Python para a primeira fatia portável.
- Worker R/container: manter inicialmente FarringtonFlexible e GLM no motor R original até haver testes de paridade suficientes.

## Conteúdo atual

- `python-worker`: protótipo Python para validação de schema, preprocessamento, agregação semanal ISO, EARS e CUSUM, com FarringtonFlexible/GLM delegados ao bridge local para `Rscript`.
- `supabase`: schema inicial para jobs, datasets, resultados, artefactos e buckets privados.
- `ARCHITECTURE.md`: mapa de migração e limites de responsabilidade.
- `ALGORITHM_PARITY.md`: contrato de paridade para comparar outputs Python/R antes de declarar métodos validados.

## Limites assumidos

- Os métodos nativos Python nesta primeira fatia cobrem EARS e CUSUM como protótipo funcional.
- FarringtonFlexible e GLM não devem ser reimplementados à pressa; devem ser chamados via worker R ou portados com golden tests.
- O input é uma line list agregável a contagens semanais; não há denominadores populacionais na definição base dos sinais.
- Dados de vigilância epidemiológica devem ser tratados como sensíveis: buckets privados, RLS, logs mínimos e retenção definida.
- A Data API do Supabase deve ser revista por tabela; tabelas sensíveis não devem ficar expostas sem necessidade, mesmo com RLS.
