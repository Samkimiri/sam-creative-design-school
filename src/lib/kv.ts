import { kv } from "@vercel/kv";

/**
 * A robust database layer that uses Vercel KV (Redis) for true persistence on Vercel,
 * and falls back to a global memory cache for local development or when KV is not set up.
 */

// Use globalThis to persist the memory database across hot-reloads locally
const memoryCache = (globalThis as any).memoryCache || ((globalThis as any).memoryCache = {});

export async function getData<T>(key: string, defaultValue: T[]): Promise<T[]> {
  try {
    // 1. Try Vercel KV first (if configured)
    if (process.env.KV_REST_API_URL) {
      const data = await kv.get<T[]>(key);
      if (Array.isArray(data)) return data;
      if (data && typeof data === 'object') return Object.values(data) as T[];
    }
  } catch (error) {
    console.error(`KV Read Error for ${key}:`, error);
  }

  // 2. Fallback to Memory Cache
  if (memoryCache[key]) {
    const data = memoryCache[key];
    if (Array.isArray(data)) return data as T[];
    if (typeof data === 'object') return Object.values(data) as T[];
  }

  // 3. Fallback to the default value (usually from JSON files)
  return defaultValue;
}

export async function setData<T>(key: string, data: T[]): Promise<void> {
  // Always update Memory Cache for immediate consistency
  memoryCache[key] = data;

  try {
    // Try to persist to Vercel KV
    if (process.env.KV_REST_API_URL) {
      await kv.set(key, data);
    }
  } catch (error) {
    console.error(`KV Write Error for ${key}:`, error);
  }
}
