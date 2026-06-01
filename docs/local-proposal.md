# Proposta local: episignal-pt

## Objetivo

`episignal-pt` é uma proposta local e privada para explorar uma interface portuguesa de apoio à deteção de sinais em vigilância epidemiológica.

O projeto inspira-se no `United4Surveillance/signal-detection-tool`, mas não pretende substituir a implementação R original nem apresentar-se como ferramenta oficial. A prioridade é clarificar fluxo de trabalho, experiência de utilização, dados sintéticos, limites metodológicos e caminho de validação.

## Proposta funcional

- Interface web local para carregar, validar e explorar line-lists.
- Amostra portuguesa sintética para demonstração sem dados reais.
- Visualizações por distrito, grupo etário, sexo e série temporal semanal.
- Evolução planeada para zoom distrito -> concelho, mantendo agregação e privacidade por desenho.
- Métodos de sinalização alinhados com o projeto original: FarringtonFlexible, GLM, EARS e CUSUM.
- Caminho de worker Python/R para manter métodos R-backed sem reimplementação indevida em JavaScript.
- Relatório demonstrativo e futuro caminho para relatórios HTML/DOCX compatíveis com o racional original.

## Princípios metodológicos

- Separar demonstração visual de validação epidemiológica.
- Não afirmar paridade algorítmica sem fixtures e comparação com outputs R aprovados.
- Usar denominadores apenas quando explicitamente disponíveis e adequados ao filtro.
- Tratar `date_onset` como preferível para curvas epidémicas quando existir; `date_report` é aceitável para vigilância operacional, mas pode introduzir atraso administrativo.
- Avaliar sinais por agente/doença antes de interpretar agregados multi-pathogen.

## Dados e segurança

- A amostra incluída é totalmente sintética.
- Não devem ser usados dados reais sem base legal, DPIA ou avaliação equivalente, minimização, pseudonimização, controlo de acessos, auditoria e política de retenção.
- Uploads reais exigiriam armazenamento privado, RLS ou controlo equivalente, jobs auditáveis e segregação por projeto/utilizador.

## Diferenças face ao upstream

- Frontend Next.js em vez de Shiny como camada principal de interação.
- Foco português e linguagem bilingue PT/EN.
- Visualizações redesenhadas para leitura epidemiológica e acessibilidade.
- Worker Python/R como camada de integração para métodos R-backed.
- Documentação explícita de limites, governação e não endosso institucional.

## Validação necessária

- Comparar FarringtonFlexible e GLM contra fixtures R do pacote original.
- Endurecer EARS e CUSUM com casos-limite e séries conhecidas.
- Testar falhas limpas quando `Rscript` ou pacotes R não estão disponíveis.
- Rever o sample sintético contra cenários clássicos de outbreak: point-source, propagated e continuous common source.
- Validar UX com utilizadores técnicos antes de qualquer exposição pública.
