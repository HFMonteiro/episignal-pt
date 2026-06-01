create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.datasets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  original_filename text not null,
  storage_bucket text not null default 'signal-uploads',
  storage_path text not null,
  content_type text,
  size_bytes bigint,
  row_count integer,
  schema_errors jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.analysis_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  dataset_id uuid not null references public.datasets(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
  method text not null,
  parameters jsonb not null default '{}'::jsonb,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.signal_results (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.analysis_jobs(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  week integer not null check (week between 1 and 53),
  category text,
  stratum text,
  cases integer not null check (cases >= 0),
  alarms boolean,
  upperbound double precision,
  expected double precision,
  method text not null,
  number_of_weeks integer not null,
  alpha_upper double precision,
  created_at timestamptz not null default now()
);

create index if not exists signal_results_job_week_idx
  on public.signal_results (job_id, year, week, category, stratum);

create table if not exists public.report_artifacts (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.analysis_jobs(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  artifact_type text not null check (artifact_type in ('html_report', 'word_report', 'signals_csv', 'signals_json')),
  storage_bucket text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  dataset_id uuid references public.datasets(id) on delete set null,
  job_id uuid references public.analysis_jobs(id) on delete set null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (
    event_type in (
      'dataset_uploaded',
      'dataset_validated',
      'analysis_started',
      'analysis_completed',
      'analysis_failed',
      'report_generated',
      'artifact_downloaded',
      'retention_applied'
    )
  ),
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.retention_policies (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  upload_retention_days integer not null default 30 check (upload_retention_days between 1 and 3650),
  report_retention_days integer not null default 180 check (report_retention_days between 1 and 3650),
  legal_basis text,
  data_controller text,
  processor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id)
);

create index if not exists audit_events_owner_created_idx
  on public.audit_events (owner_id, created_at desc);

create index if not exists retention_policies_project_idx
  on public.retention_policies (project_id);

alter table public.projects enable row level security;
alter table public.datasets enable row level security;
alter table public.analysis_jobs enable row level security;
alter table public.signal_results enable row level security;
alter table public.report_artifacts enable row level security;
alter table public.audit_events enable row level security;
alter table public.retention_policies enable row level security;

create policy "project owners can manage projects"
  on public.projects
  for all
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owners can manage datasets"
  on public.datasets
  for all
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owners can manage jobs"
  on public.analysis_jobs
  for all
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owners can read signal results"
  on public.signal_results
  for select
  to authenticated
  using (owner_id = (select auth.uid()));

create policy "owners can manage report artifacts"
  on public.report_artifacts
  for all
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owners can read audit events"
  on public.audit_events
  for select
  to authenticated
  using (owner_id = (select auth.uid()));

create policy "owners can insert audit events"
  on public.audit_events
  for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

create policy "owners can manage retention policies"
  on public.retention_policies
  for all
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update, delete on public.datasets to authenticated;
grant select, insert, update, delete on public.analysis_jobs to authenticated;
grant select on public.signal_results to authenticated;
grant select, insert, update, delete on public.report_artifacts to authenticated;
grant select, insert on public.audit_events to authenticated;
grant select, insert, update, delete on public.retention_policies to authenticated;

insert into storage.buckets (id, name, public)
values
  ('signal-uploads', 'signal-uploads', false),
  ('signal-reports', 'signal-reports', false),
  ('signal-exports', 'signal-exports', false)
on conflict (id) do nothing;

create policy "owners can read signal storage objects"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id in ('signal-uploads', 'signal-reports', 'signal-exports')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "owners can write signal storage objects"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('signal-uploads', 'signal-reports', 'signal-exports')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "owners can update signal storage objects"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id in ('signal-uploads', 'signal-reports', 'signal-exports')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id in ('signal-uploads', 'signal-reports', 'signal-exports')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "owners can delete signal storage objects"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('signal-uploads', 'signal-reports', 'signal-exports')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
