# Python Worker Prototype

Primeira fatia de port do motor analítico do `SignalDetectionTool`.

Inclui:

- validação do schema de line list;
- preprocessamento compatível com a lógica principal do pacote R;
- agregação por semanas ISO com preenchimento de semanas sem casos;
- EARS e CUSUM nativos em Python;
- API FastAPI opcional para validação e execução local.

## Instalação

```powershell
cd C:\Users\hugof\agentplayground\episignalPT\migration\python-worker
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e .[api,test]
```

## Testes

```powershell
.\.venv\Scripts\python.exe -m pytest
```

## API local

```powershell
.\.venv\Scripts\python.exe -m uvicorn signal_detection_tool_py.api:app --reload --port 8088
```

Endpoints:

- `GET /health`
- `POST /validate`
- `POST /signals?method=ears&number_of_weeks=6`

## Aviso de paridade

Este worker mantém EARS/CUSUM em Python, mas FarringtonFlexible e GLM são executados através de um bridge para `Rscript` que chama a implementação original do pacote `SignalDetectionTool`. Se o executável não estiver no `PATH`, defina `SIGNAL_DETECTION_RSCRIPT` com o caminho absoluto para o binário. A interface local fica em `/ui`. A paridade estatística continua dependente dos golden tests do R; não trate estes métodos como um port nativo em Python.
