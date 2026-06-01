# Supabase

Este schema é uma base inicial para suportar a migração do Signal Detection Tool.

## Modelo

- `projects`: espaço lógico por utilizador/equipa.
- `datasets`: metadados de ficheiros carregados para Storage.
- `analysis_jobs`: parâmetros e estado de execução.
- `signal_results`: resultados semanais normalizados.
- `report_artifacts`: relatórios/exports gerados pelo worker.
- `audit_events`: trilho mínimo de auditoria para uploads, validações, execuções, relatórios e downloads.
- `retention_policies`: configuração por projeto para retenção de uploads, relatórios e notas de base legal.

## Buckets

O SQL cria buckets privados:

- `signal-uploads`
- `signal-reports`
- `signal-exports`

Os caminhos devem começar por `auth.uid()`:

```text
<user_id>/<project_id>/<dataset_or_job_id>/<filename>
```

## Segurança

- RLS está ativo nas tabelas e em `storage.objects`.
- O browser deve usar apenas chave pública/anon autenticada.
- A chave `service_role` fica apenas no worker/API privada.
- Não guardar dados identificáveis em logs ou mensagens de erro.

## Governação operacional

- Criar uma `retention_policies` por projeto antes de aceitar dados reais.
- Registar eventos relevantes em `audit_events` sem incluir dados pessoais no `event_payload`.
- Os uploads e relatórios devem permanecer em buckets privados.
- Os caminhos de Storage devem continuar a começar por `auth.uid()` para alinhar com as políticas RLS.
- Confirmar nas definições de Data API do Supabase se as tabelas devem estar expostas. Mesmo com RLS, tabelas sensíveis não devem ser expostas publicamente sem necessidade.
- Para dados reais de saúde, documentar controlador, fundamento legal, finalidade, prazo de conservação e procedimento de eliminação.

## Limites deste schema

Este SQL é uma base de migração, não uma configuração de produção completa. Faltam ainda:

- Função/job de aplicação automática das regras de retenção.
- Políticas de equipa/organização para projetos partilhados.
- Auditoria server-side imutável para ações críticas.
- Testes SQL locais ou advisors Supabase executados contra uma instância real.
