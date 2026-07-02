type SupabaseRecord<T> = {
  data: T;
};

type SupabaseRow<T> = {
  collection: string;
  record_id: string;
  position: number;
  data: T;
};

const supabaseUrl = process.env.SCDS_DB_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey =
  process.env.SCDS_DB_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const requestTimeoutMs = Number(process.env.SCDS_DB_TIMEOUT_MS || 2500);

function getRestUrl(path: string) {
  if (!supabaseUrl) throw new Error("Supabase URL is not configured");
  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`;
}

function getHeaders(extra?: HeadersInit): HeadersInit {
  if (!supabaseServiceKey) throw new Error("Supabase service role key is not configured");
  return {
    apikey: supabaseServiceKey,
    Authorization: `Bearer ${supabaseServiceKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function parseSupabaseError(response: Response) {
  const text = await response.text().catch(() => "");
  try {
    const data = JSON.parse(text) as { message?: string; details?: string };
    return data.message || data.details || response.statusText;
  } catch {
    return text || response.statusText;
  }
}

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseServiceKey);
}

async function fetchSupabase(input: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getSupabaseCollection<T>(collection: string): Promise<T[]> {
  const query = new URLSearchParams({
    collection: `eq.${collection}`,
    select: "data",
    order: "position.asc",
  });

  const response = await fetchSupabase(getRestUrl(`app_records?${query.toString()}`), {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase read failed: ${await parseSupabaseError(response)}`);
  }

  const rows = (await response.json()) as SupabaseRecord<T>[];
  return rows.map((row) => row.data);
}

export async function getSupabaseRecord<T>(collection: string, recordId: string): Promise<T | null> {
  const query = new URLSearchParams({
    collection: `eq.${collection}`,
    record_id: `eq.${recordId}`,
    select: "data",
    limit: "1",
  });

  const response = await fetchSupabase(getRestUrl(`app_records?${query.toString()}`), {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase record read failed: ${await parseSupabaseError(response)}`);
  }

  const rows = (await response.json()) as SupabaseRecord<T>[];
  return rows[0]?.data ?? null;
}

export async function findSupabaseRecordByJsonField<T>(
  collection: string,
  field: string,
  value: string
): Promise<T | null> {
  const query = new URLSearchParams({
    collection: `eq.${collection}`,
    select: "data",
    limit: "1",
  });
  query.set(`data->>${field}`, `eq.${value}`);

  const response = await fetchSupabase(getRestUrl(`app_records?${query.toString()}`), {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase field read failed: ${await parseSupabaseError(response)}`);
  }

  const rows = (await response.json()) as SupabaseRecord<T>[];
  return rows[0]?.data ?? null;
}

export async function findSupabaseRecordByJsonFieldInsensitive<T>(
  collection: string,
  field: string,
  value: string
): Promise<T | null> {
  const query = new URLSearchParams({
    collection: `eq.${collection}`,
    select: "data",
    limit: "1",
  });
  query.set(`data->>${field}`, `ilike.${value}`);

  const response = await fetchSupabase(getRestUrl(`app_records?${query.toString()}`), {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase field read failed: ${await parseSupabaseError(response)}`);
  }

  const rows = (await response.json()) as SupabaseRecord<T>[];
  return rows[0]?.data ?? null;
}

export async function saveSupabaseCollection<T>(collection: string, data: T[]): Promise<void> {
  const deleteResponse = await fetchSupabase(
    getRestUrl(`app_records?collection=eq.${encodeURIComponent(collection)}`),
    {
      method: "DELETE",
      headers: getHeaders({ Prefer: "return=minimal" }),
    }
  );

  if (!deleteResponse.ok) {
    throw new Error(`Supabase delete failed: ${await parseSupabaseError(deleteResponse)}`);
  }

  if (data.length === 0) return;

  const rows: SupabaseRow<T>[] = data.map((item, index) => {
    const record = item as Record<string, unknown>;
    return {
      collection,
      record_id: typeof record.id === "string" && record.id.trim() ? record.id : `${collection}-${index}`,
      position: index,
      data: item,
    };
  });

  const insertResponse = await fetchSupabase(getRestUrl("app_records"), {
    method: "POST",
    headers: getHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(rows),
  });

  if (!insertResponse.ok) {
    throw new Error(`Supabase write failed: ${await parseSupabaseError(insertResponse)}`);
  }
}

export async function upsertSupabaseRecord<T>(
  collection: string,
  recordId: string,
  data: T,
  position = Math.floor(Date.now() / 1000)
): Promise<void> {
  const row: SupabaseRow<T> = {
    collection,
    record_id: recordId,
    position,
    data,
  };

  const response = await fetchSupabase(getRestUrl("app_records?on_conflict=collection,record_id"), {
    method: "POST",
    headers: getHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    throw new Error(`Supabase upsert failed: ${await parseSupabaseError(response)}`);
  }
}
