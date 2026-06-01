# Nota metodologica - Signal Detection Tool PT

## 1. Finalidade

Este projeto e um prototipo de aplicacao para apoio a deteccao de sinais em vigilancia epidemiologica, inspirado no `signal-detection-tool` do projeto United4Surveillance e na experiencia visual/funcional da aplicacao Shiny original.

O objetivo e permitir que um analista carregue uma line-list de casos, aplique filtros e estratificacoes, execute um fluxo de deteccao de sinais e visualize resultados por semana, distrito, grupo etario e sexo.

Este prototipo nao deve ser usado como sistema validado de decisao epidemiologica ate existir paridade metodologica e estatistica com os algoritmos originais em R.

## 2. Unidade de analise

A unidade de entrada e uma linha por caso notificado. A unidade de analise para deteccao de sinais e a contagem semanal de casos, agregada por semana ISO e, quando aplicavel, por estratos selecionados.

O denominador atual e sempre `numero de casos`. O prototipo nao calcula taxas, incidencias, populacoes em risco, padronizacao por idade ou ajustes por cobertura de vigilancia.

## 3. Estrutura esperada dos dados

Campos obrigatorios:

| Campo | Tipo esperado | Nota |
| --- | --- | --- |
| `case_id` | texto ou numero | Identificador pseudonimo do caso. Nao deve conter identificadores diretos. |
| `date_report` | `YYYY-MM-DD` | Data usada para agregacao semanal. |
| `country` | texto | Pais de notificacao. |
| `country_id` | texto ou numero | Codigo do pais, preferencialmente ISO ou NUTS-0. |
| `pathogen` | texto | Doenca, agente, diagnostico, serovar ou topico de vigilancia. |
| `age` ou `age_group` | inteiro ou intervalo | Pelo menos um deve existir para estratificacao etaria. |

Campos opcionais atualmente usados:

| Campo | Tipo esperado | Nota |
| --- | --- | --- |
| `sex` | `male`, `female`, `diverse`, `unknown` | Usado para filtros e graficos por sexo. |
| `district` | texto | Usado para mapa e estratificacao territorial. |
| `district_id` | texto ou numero | Codigo territorial, quando disponivel. |
| `region`, `region_id`, `municipality` | texto ou numero | Metadados territoriais ainda nao usados diretamente no prototipo. |
| `outbreak_status` | `yes`, `no`, `unknown` | Indicador opcional de casos ja associados a surto conhecido; nao deve substituir a deteccao estatistica. |

## 4. Regras de qualidade de dados

Antes da analise, devem ser verificados:

- Presenca dos campos obrigatorios.
- Datas validas e dentro do periodo esperado.
- Consistencia entre filtros, periodo selecionado e dados disponiveis.
- Idades negativas ou grupos etarios invalidos.
- Valores em falta em `pathogen`, `date_report`, `country` e `country_id`.
- Categorias inesperadas em `sex`, `district` ou outras variaveis de estratificacao.
- Duplicados em `case_id`, quando esse identificador representar uma ocorrencia unica.

Valores em falta devem ser tratados explicitamente. Nao devem ser silenciosamente removidos sem registo, porque isso altera denominadores e pode enviesar os resultados.

## 5. Filtros e denominadores

Os filtros ativos definem a populacao analitica:

- Doenca/agente (`pathogen`).
- Distrito.
- Sexo.
- Intervalo de datas.
- Numero de semanas do periodo de deteccao.

Todos os indicadores visuais devem ser interpretados no universo dos casos filtrados. Se um filtro reduz o conjunto de dados, os totais, graficos e tabelas devem refletir apenas esse subconjunto.

O periodo de deteccao corresponde as ultimas `n` semanas do intervalo filtrado. O historico de treino corresponde ao periodo anterior a essas semanas finais.

## 6. Disponibilidade de metodos

A selecao automatica de metodos segue a logica metodologica do ficheiro `R/get_possible_methods.R` do repositorio original:

| Historico disponivel para fitting | Metodos elegiveis |
| --- | --- |
| >= 208 semanas | Todos os metodos, incluindo variantes GLM/Farrington. |
| >= 156 e < 208 semanas | Todos exceto variantes GLM Farrington que exigem mais historico. |
| >= 104 e < 156 semanas | Exclui variantes GLM Farrington e harmonicas com requisitos mais fortes. |
| >= 26 e < 104 semanas | Metodos simples como Mean, CUSUM e EARS. |
| >= 7 e < 26 semanas | CUSUM e EARS. |
| >= 1 e < 7 semanas | CUSUM. |
| < 1 semana | Nenhum metodo aplicavel. |

No prototipo Next atual, a lista foi reduzida aos metodos expostos na interface: `FarringtonFlexible`, `GLM`, `EARS` e `CUSUM`. Quando o historico e insuficiente, o metodo aparece indisponivel.

## 7. Estado atual dos algoritmos

O prototipo atual executa uma demonstracao em TypeScript/Python para suportar a experiencia de utilizador. Isto e suficiente para validar fluxo, filtros, mapas, tabelas e exportacao simples, mas nao e suficiente para uso epidemiologico operacional.

Estado metodologico:

- `CUSUM`: exposto como candidato funcional no prototipo, mas requer comparacao formal com a implementacao R.
- `EARS`: disponivel como demonstracao, mas ainda sem paridade testada.
- `FarringtonFlexible`: requer worker R/Python e testes de paridade com `R/farrington_flexible.R`.
- `GLM`: requer worker R/Python e testes de paridade com `R/glm_algorithm.R`.
- Relatorios HTML/DOCX: ainda nao equivalentes ao `run_report()` do Shiny original.

Qualquer resultado produzido nesta fase deve ser rotulado como demonstracao, nao como output validado de vigilancia.

## 8. Estratificacao

A aplicacao suporta ate tres estratos principais:

- Distrito.
- Grupo etario.
- Sexo.

A estratificacao altera a interpretacao dos sinais: um sinal por estrato indica que a contagem naquele subconjunto excedeu o limiar definido pelo metodo. O total de sinais estratificados nao deve ser somado diretamente como numero de surtos, porque varios estratos podem representar o mesmo fenomeno epidemiologico.

## 9. Visualizacoes

Visualizacoes atuais:

- Cartoes de resumo com metodo, periodo, casos e alarmes.
- Mapa SVG de distritos de Portugal Continental, com intensidade de casos e contorno para sinais.
- Graficos de barras por grupo etario e sexo.
- Serie temporal semanal com casos e limiar superior.
- Tabela semanal com casos, sinal, valor esperado e limite superior.

O mapa usa geometria publica de distritos portugueses adaptada de Wikimedia Commons. A cor representa intensidade relativa no conjunto filtrado, nao incidencia territorial.

## 10. Relatorios e exportacao

O prototipo permite exportacao JSON e CSV de exemplo. O modulo de relatorio ainda nao substitui a funcionalidade original em R:

- `run_report()` HTML/DOCX.
- Tabelas formatadas por estrato.
- Narrativa parametrizada.
- Artefactos reprodutiveis com versao de dados, parametros e algoritmo.

Antes de uso formal, cada relatorio deve incluir:

- Fonte e versao dos dados.
- Data/hora de execucao.
- Filtros aplicados.
- Metodo e parametros.
- Periodo de treino e periodo de deteccao.
- Limitacoes conhecidas.
- Responsavel pela validacao analitica.

## 11. Validacao necessaria

Para considerar a aplicacao metodologicamente pronta, devem existir testes de paridade contra o repositorio original:

1. Conjunto de dados sintetico controlado.
2. Conjunto de dados com casos extremos: semanas vazias, faltas, duplicados, poucos historicos, multiplos agentes.
3. Comparacao por algoritmo entre output R e output da aplicacao.
4. Testes por estrato, incluindo distrito, idade e sexo.
5. Verificacao de arredondamentos, semanas ISO, limites superiores e flags de alarme.
6. Testes de regressao para ficheiros CSV/XLSX.
7. Testes end-to-end do fluxo Data -> Input parameters -> Signals -> Report.

Os resultados so devem ser considerados equivalentes quando diferencas numericas esperadas estiverem documentadas e dentro de tolerancias aprovadas.

## 12. Governacao, seguranca e GDPR

Dados de vigilancia epidemiologica podem conter dados pessoais ou dados de saude. Mesmo line-lists pseudonimizadas devem ser tratadas como sensiveis.

Requisitos antes de dados reais:

- Nao carregar identificadores diretos como NIF, numero de utente, nome, morada, telefone ou email.
- Usar armazenamento privado para uploads e relatorios.
- Ativar controlo de acesso, auditoria e retencao definida.
- Aplicar RLS e politicas de permissao se Supabase for usado.
- Separar ambientes de desenvolvimento, teste e producao.
- Registar versao dos dados, parametros e algoritmo.
- Definir base legal, finalidade, periodo de conservacao e responsaveis pelo tratamento.

Uma instancia publica sem autenticacao so deve usar dados sinteticos ou dados publicos agregados.

## 13. Limitacoes atuais

Limitacoes conhecidas do prototipo:

- Algoritmos estatisticos ainda nao validados contra o R original.
- Sem ingestao robusta de XLSX no frontend.
- Sem geracao real de DOCX/HTML equivalente ao Shiny.
- Sem persistencia operacional de jobs, uploads e artefactos.
- Sem autenticacao, autorizacao ou auditoria.
- Sem calculo de taxas ou denominadores populacionais.
- Sem suporte completo a multiplos agentes/doencas em relatorio.

## 14. Proximo passo recomendado

O proximo passo tecnico deve ser ligar um worker R/Python que execute os algoritmos originais ou uma reimplementacao testada, com suite de paridade. A evolucao visual deve ficar secundaria ate os resultados estatisticos serem defensaveis.

Sequencia recomendada:

1. Definir datasets de teste e outputs esperados a partir do R original.
2. Implementar endpoint de execucao por metodo.
3. Guardar parametros e resultados de cada job.
4. Comparar automaticamente resultados R vs app.
5. Reimplementar `run_report()` ou gerar HTML/DOCX equivalente.
6. So depois preparar deploy publico ou ambiente com Supabase.
