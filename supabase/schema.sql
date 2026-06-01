create table if not exists public.app_records (
  collection text not null,
  record_id text not null,
  position integer not null default 0,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (collection, record_id)
);

create index if not exists app_records_collection_position_idx
  on public.app_records (collection, position);

create index if not exists app_records_collection_updated_idx
  on public.app_records (collection, updated_at desc);

create index if not exists app_records_students_email_idx
  on public.app_records (lower(data->>'email'))
  where collection = 'students';

create index if not exists app_records_enrollments_reference_idx
  on public.app_records ((data->>'reference'))
  where collection = 'enrollments';

create index if not exists app_records_enrollments_checkout_idx
  on public.app_records ((data->>'checkoutRequestId'))
  where collection = 'enrollments';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_app_records_updated_at on public.app_records;

create trigger set_app_records_updated_at
before update on public.app_records
for each row
execute function public.set_updated_at();

alter table public.app_records enable row level security;
