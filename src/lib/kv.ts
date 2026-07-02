import { kv } from "@vercel/kv";

type GlobalKV = typeof globalThis & { memoryCache?: Record<string, unknown[]> };
const globalKV = globalThis as GlobalKV;
const memoryCache: Record<string, unknown[]> =
  globalKV.memoryCache ?? (globalKV.memoryCache = {});

export async function getData<T>(key: string, defaultValue: T[]): Promise<T[]> {
  try {
    if (process.env.KV_REST_API_URL) {
      const data = await kv.get<T[]>(key);
      if (Array.isArray(data)) return data;
      if (data && typeof data === "object") return Object.values(data) as T[];
    }
  } catch (error) {
    console.error(`KV Read Error for ${key}:`, error);
  }

  if (memoryCache[key]) {
    const data = memoryCache[key];
    if (Array.isArray(data)) return data as T[];
    if (typeof data === "object") return Object.values(data) as T[];
  }

  return defaultValue;
}

export function hasKVConfig(): boolean {
  return Boolean(process.env.KV_REST_API_URL);
}

export async function setData<T>(key: string, data: T[]): Promise<void> {
  memoryCache[key] = data as unknown[];

  try {
    if (process.env.KV_REST_API_URL) {
      await kv.set(key, data);
    }
  } catch (error) {
    console.error(`KV Write Error for ${key}:`, error);
  }
}
