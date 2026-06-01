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

export async function getSupabaseCollection<T>(collection: string): Promise<T[]> {
  const query = new URLSearchParams({
    collection: `eq.${collection}`,
    select: "data",
    order: "position.asc",
  });

  const response = await fetch(getRestUrl(`app_records?${query.toString()}`), {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase read failed: ${await parseSupabaseError(response)}`);
  }

  const rows = (await response.json()) as SupabaseRecord<T>[];
  return rows.map((row) => row.data);
}

export async function saveSupabaseCollection<T>(collection: string, data: T[]): Promise<void> {
  const deleteResponse = await fetch(
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

  const insertResponse = await fetch(getRestUrl("app_records"), {
    method: "POST",
    headers: getHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(rows),
  });

  if (!insertResponse.ok) {
    throw new Error(`Supabase write failed: ${await parseSupabaseError(insertResponse)}`);
  }
}
