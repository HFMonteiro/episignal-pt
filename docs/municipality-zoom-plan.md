# Plano técnico: zoom distrito -> concelho

## Objetivo

Adicionar uma vista progressiva do mapa português: primeiro distrito, depois concelho dentro do distrito selecionado.

O objetivo é apoiar leitura epidemiológica local sem sugerir precisão indevida quando os dados são sintéticos, incompletos ou agregados a níveis administrativos diferentes.

## Modelo de interação

- A vista inicial mantém o mapa por distrito.
- Clique num distrito abre a vista desse distrito por concelho.
- A vista de concelho mostra breadcrumb: `Portugal -> Distrito -> Concelhos`.
- Um botão `Voltar a distritos` repõe o mapa nacional.
- Filtros existentes de agente, sexo, data e janela de deteção continuam a aplicar-se.
- Se não houver geometrias ou dados concelhios, mostrar estado vazio explícito em vez de interpolar.

## Dados necessários

- Campo de line-list: `municipality` e, idealmente, `municipality_id`.
- Tabela de referência administrativa:
  - `district_id`
  - `district`
  - `municipality_id`
  - `municipality`
  - geometria simplificada ou path SVG/GeoJSON
  - população sintética ou denominador explícito, quando usado para taxas
- Para demo pública, usar apenas dados sintéticos e geometrias com licença compatível.

## Regras epidemiológicas

- Mostrar contagens por defeito.
- Mostrar taxas por 100 mil apenas quando existir denominador concelhio explícito e adequado ao filtro.
- Não calcular taxas sexo-específicas ou etárias sem denominadores por sexo/idade.
- Evitar sinalização visual excessiva em concelhos com números muito baixos; usar nota de cautela para pequenas contagens.
- Interpretar sinais por agente/doença antes de agregar agentes.

## Implementação recomendada

- Criar um componente de mapa hierárquico controlado por estado:
  - `level: "district" | "municipality"`
  - `selectedDistrictId: string | null`
- Manter agregação no cliente enquanto o dataset é sintético e pequeno.
- Separar dados geográficos de dados epidemiológicos.
- Carregar geometrias concelhias de forma lazy para evitar penalizar a primeira renderização.
- Usar SVG ou GeoJSON simplificado, não imagens raster.

## Critérios de aceitação

- Clique em distrito muda para concelhos desse distrito.
- Breadcrumb e botão de retorno funcionam.
- Filtros existentes alteram os valores do mapa sem resetar indevidamente o zoom.
- Sem dados concelhios mostra mensagem clara.
- Build da app continua a passar.
- A documentação mantém aviso de dados sintéticos e de ausência de endosso institucional.
