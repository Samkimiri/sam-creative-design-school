import fs from "fs";
import path from "path";
import { getData as getKVData, hasKVConfig, setData as setKVData } from "./kv";
import getMongoClient, { hasMongoConfig } from "./mongodb";
import {
  deleteSupabaseRecord,
  findSupabaseRecordByJsonField,
  findSupabaseRecordByJsonFieldInsensitive,
  getSupabaseCollection,
  getSupabaseRecord,
  hasSupabaseConfig,
  saveSupabaseCollection,
  upsertSupabaseRecord,
} from "./supabase";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function getCollectionName(filename: string): string {
  return filename.replace(".json", "");
}

type MemoryDB = Record<string, unknown[]>;
type MemoryDBTimestamps = Record<string, number>;
const globalDb = globalThis as typeof globalThis & { memoryDB?: MemoryDB; memoryDBTimestamps?: MemoryDBTimestamps };
const memoryDB: MemoryDB = globalDb.memoryDB ?? (globalDb.memoryDB = {});
const memoryDBTimestamps: MemoryDBTimestamps = globalDb.memoryDBTimestamps ?? (globalDb.memoryDBTimestamps = {});

// Collections that must land in real persistent storage in production (see
// requiresPersistentStorage below), and that are polled/written to constantly
// enough that even a few seconds of cross-instance cache staleness is not
// acceptable - these are always read live, never served from the in-memory cache.
const HIGH_WRITE_FILES = new Set([
  "analytics-events.json",
  "analytics-sessions.json",
  "enrollments.json",
  "messages.json",
  "password-resets.json",
  "site-settings.json",
  // Community collections are polled and written to constantly by many
  // students at once - never serve a per-instance stale cache for these.
  "community-messages.json",
  "community-blocks.json",
  "community-posts.json",
  "community-post-comments.json",
  "community-reactions.json",
]);
const legacyLookupTimeoutMs = Number(process.env.SCDS_LEGACY_DB_TIMEOUT_MS || 1800);

// In a multi-instance deployment (e.g. concurrent serverless invocations), each
// process holds its own copy of this cache. A write from one instance (an admin
// disenrolling a student, a student renaming their profile) has no way to notify
// the other warm instances, so an un-expiring cache would let them keep serving
// what they last saw indefinitely - which is exactly what used to make admin
// screens and the leaderboard show stale students/enrollments/names. Bounding
// every cached read to a few seconds means any instance is guaranteed to pick up
// someone else's write shortly after, while still avoiding a database round trip
// on every single read within a fast burst of requests.
const MEMORY_CACHE_TTL_MS = Number(process.env.SCDS_DB_CACHE_TTL_MS || 5000);

function shouldUseMemoryCache(filename: string) {
  return !HIGH_WRITE_FILES.has(filename);
}

function isMemoryCacheFresh(filename: string): boolean {
  if (!shouldUseMemoryCache(filename)) return false;
  if (!(filename in memoryDB)) return false;
  const cachedAt = memoryDBTimestamps[filename];
  return cachedAt !== undefined && Date.now() - cachedAt < MEMORY_CACHE_TTL_MS;
}

function setMemoryCache(filename: string, data: unknown[]) {
  memoryDB[filename] = data;
  memoryDBTimestamps[filename] = Date.now();
}

export function hasPersistentStorageConfig() {
  return hasSupabaseConfig() || hasMongoConfig() || hasKVConfig();
}

export function requiresPersistentStorage(filename: string) {
  return HIGH_WRITE_FILES.has(filename) && (Boolean(process.env.VERCEL) || process.env.NODE_ENV === "production");
}

export function persistentStorageError(filename: string) {
  return new Error(
    `${getCollectionName(filename)} requires persistent storage in production. Configure Supabase, MongoDB, or Vercel KV so submitted records can appear in the admin dashboard.`
  );
}

export function readJSON<T>(filename: string): T[] {
  if (isMemoryCacheFresh(filename)) return memoryDB[filename] as T[];

  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as T[];
    if (shouldUseMemoryCache(filename)) setMemoryCache(filename, data as unknown[]);
    return data;
  } catch {
    return [];
  }
}

export async function getDB<T>(filename: string): Promise<T[]> {
  if (isMemoryCacheFresh(filename)) return memoryDB[filename] as T[];

  if (requiresPersistentStorage(filename) && !hasPersistentStorageConfig()) {
    throw persistentStorageError(filename);
  }

  if (hasSupabaseConfig()) {
    try {
      const collection = getCollectionName(filename);
      const data = await getSupabaseCollection<T>(collection);

      if (data.length === 0) {
        const fallbackData = readJSON<T>(filename);
        if (fallbackData.length > 0) {
          await saveSupabaseCollection(collection, fallbackData);
          if (shouldUseMemoryCache(filename)) setMemoryCache(filename, fallbackData as unknown[]);
          return fallbackData;
        }
      }

      if (shouldUseMemoryCache(filename)) setMemoryCache(filename, data as unknown[]);
      return data;
    } catch (error) {
      console.error("Supabase getDB error:", error);
      if (requiresPersistentStorage(filename) && !hasMongoConfig() && !hasKVConfig()) {
        throw error instanceof Error ? error : persistentStorageError(filename);
      }
      return readJSON<T>(filename);
    }
  }

  if (!hasMongoConfig()) {
    if (hasKVConfig()) {
      const fallbackData = readJSON<T>(filename);
      const data = await getKVData<T>(getCollectionName(filename), fallbackData);
      if (shouldUseMemoryCache(filename)) setMemoryCache(filename, data as unknown[]);
      return data;
    }

    if (requiresPersistentStorage(filename)) {
      throw persistentStorageError(filename);
    }

    return readJSON<T>(filename);
  }

  try {
    const client = await getMongoClient();
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));

    const documents = await collection.find({}).toArray();

    if (documents.length === 0) {
      const fallbackData = readJSON<T>(filename);
      if (fallbackData.length > 0) {
        await saveDB(filename, fallbackData);
        if (shouldUseMemoryCache(filename)) setMemoryCache(filename, fallbackData as unknown[]);
        return fallbackData;
      }
      return [];
    }

    const data = documents.map((doc) => {
      const { _id: _unused, ...rest } = doc as Record<string, unknown> & { _id?: unknown };
      void _unused;
      return rest as T;
    });
    if (shouldUseMemoryCache(filename)) setMemoryCache(filename, data as unknown[]);
    return data;
  } catch (error) {
    console.error("MongoDB getDB error:", error);
    if (requiresPersistentStorage(filename)) {
      throw error instanceof Error ? error : persistentStorageError(filename);
    }
    return readJSON<T>(filename);
  }
}

export async function getDBRecord<T>(filename: string, recordId: string): Promise<T | null> {
  if (!recordId.trim()) return null;

  if (requiresPersistentStorage(filename) && !hasPersistentStorageConfig()) {
    throw persistentStorageError(filename);
  }

  if (hasSupabaseConfig()) {
    try {
      const match = await getSupabaseRecord<T>(getCollectionName(filename), recordId.trim());
      if (match) return match;
    } catch (error) {
      console.error("Supabase getDBRecord error:", error);
    }
  }

  if (!hasMongoConfig()) {
    const data = readJSON<T>(filename);
    return data.find((item) => String((item as Record<string, unknown>).id || "") === recordId.trim()) ?? null;
  }

  try {
    const client = await getMongoClient();
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));
    const document = await collection.findOne({ id: recordId.trim() });
    if (!document) return null;
    const { _id: _unused, ...rest } = document as Record<string, unknown> & { _id?: unknown };
    void _unused;
    return rest as T;
  } catch (error) {
    console.error("MongoDB getDBRecord error:", error);
  }

  const data = readJSON<T>(filename);
  return data.find((item) => String((item as Record<string, unknown>).id || "") === recordId.trim()) ?? null;
}

export async function findDBRecordByField<T>(
  filename: string,
  field: string,
  value: string
): Promise<T | null> {
  const cleanValue = value.trim();
  if (!field || !cleanValue) return null;
  const findInMemory = () =>
    isMemoryCacheFresh(filename)
      ? (memoryDB[filename] as T[] | undefined)?.find((item) =>
          String((item as Record<string, unknown>)[field] || "").trim().toLowerCase() === cleanValue.toLowerCase()
        ) ?? null
      : null;

  const cached = findInMemory();
  if (cached) return cached;

  if (hasSupabaseConfig()) {
    try {
      const collection = getCollectionName(filename);
      const match = filename === "students.json" && field === "email"
        ? await findSupabaseRecordByJsonFieldInsensitive<T>(collection, field, cleanValue)
        : await findSupabaseRecordByJsonField<T>(collection, field, cleanValue);
      if (match) return match;
    } catch (error) {
      console.error("Supabase findDBRecordByField error:", error);
    }
  }

  if (!hasMongoConfig()) {
    const data = readJSON<T>(filename);
    return data.find((item) =>
      String((item as Record<string, unknown>)[field] || "").trim().toLowerCase() === cleanValue.toLowerCase()
    ) ?? null;
  }

  try {
    const client = await withTimeout(getMongoClient(), legacyLookupTimeoutMs);
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));
    const queryValue = filename === "students.json" && field === "email"
      ? { $regex: `^${escapeRegex(cleanValue)}$`, $options: "i" }
      : cleanValue;
    const document = await collection.findOne({ [field]: queryValue });
    if (!document) return null;
    const { _id: _unused, ...rest } = document as Record<string, unknown> & { _id?: unknown };
    void _unused;
    return rest as T;
  } catch (error) {
    console.error("MongoDB findDBRecordByField error:", error);
  }

  const data = readJSON<T>(filename);
  return data.find((item) =>
    String((item as Record<string, unknown>)[field] || "").trim().toLowerCase() === cleanValue.toLowerCase()
  ) ?? null;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout>;
  const timer = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timer]);
  } finally {
    clearTimeout(timeout!);
  }
}

export async function saveDB<T>(filename: string, data: T[]): Promise<void> {
  if (shouldUseMemoryCache(filename)) setMemoryCache(filename, data as unknown[]);
  const persistenceErrors: unknown[] = [];

  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Local file write is optional when MongoDB is available
  }

  if (hasSupabaseConfig()) {
    try {
      await saveSupabaseCollection(getCollectionName(filename), data);
      return;
    } catch (error) {
      console.error("Supabase saveDB error:", error);
      persistenceErrors.push(error);
    }
  }

  if (!hasMongoConfig()) {
    if (hasKVConfig()) {
      try {
        await setKVData(getCollectionName(filename), data);
        return;
      } catch (error) {
        console.error("KV saveDB error:", error);
        persistenceErrors.push(error);
      }
    }

    if (requiresPersistentStorage(filename)) {
      throw persistenceErrors[0] instanceof Error ? persistenceErrors[0] : persistentStorageError(filename);
    }
    return;
  }

  try {
    const client = await getMongoClient();
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));

    const cleanData = data.map((item) => {
      const { _id: _unused, ...rest } = item as Record<string, unknown> & { _id?: unknown };
      void _unused;
      return rest;
    });

    await collection.deleteMany({});
    if (cleanData.length > 0) {
      await collection.insertMany(cleanData);
    }
  } catch (error) {
    console.error("MongoDB saveDB error:", error);
    if (requiresPersistentStorage(filename)) {
      throw error instanceof Error ? error : persistentStorageError(filename);
    }
  }
}

export function writeJSON<T>(filename: string, data: T[]): void {
  void saveDB(filename, data);
}

export async function upsertDBRecord<T extends object>(
  filename: string,
  record: T,
  options?: { idKey?: string; position?: number }
): Promise<void> {
  const idKey = options?.idKey ?? "id";
  const recordData = record as Record<string, unknown>;
  const recordId = String(recordData[idKey] || "").trim();
  if (!recordId) throw new Error(`Cannot upsert ${filename}: missing record id`);

  if (shouldUseMemoryCache(filename)) {
    const data = readJSON<T>(filename) as unknown[];
    const index = data.findIndex((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
    if (index > -1) data[index] = record as unknown;
    else data.push(record as unknown);
    setMemoryCache(filename, data);
  }

  if (hasSupabaseConfig()) {
    try {
      await upsertSupabaseRecord(getCollectionName(filename), recordId, record, options?.position);
      return;
    } catch (error) {
      console.error("Supabase upsertDBRecord error:", error);
      if (!hasMongoConfig() && !hasKVConfig() && requiresPersistentStorage(filename)) {
        throw error instanceof Error ? error : persistentStorageError(filename);
      }
    }
  }

  if (!hasMongoConfig()) {
    if (requiresPersistentStorage(filename) && !hasKVConfig()) {
      throw persistentStorageError(filename);
    }

    await upsertIntoArrayStoreWithRetry(filename, record, idKey, recordId, hasKVConfig());
    return;
  }

  try {
    const client = await getMongoClient();
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));
    await collection.updateOne(
      { [String(idKey)]: recordId },
      { $set: record },
      { upsert: true }
    );
    return;
  } catch (error) {
    console.error("MongoDB upsertDBRecord error:", error);
    if (requiresPersistentStorage(filename) && !hasKVConfig()) {
      throw error instanceof Error ? error : persistentStorageError(filename);
    }
  }

  await upsertIntoArrayStoreWithRetry(filename, record, idKey, recordId, true);
}

/**
 * The KV/local-file backends store each collection as a single array, so a plain
 * read-modify-write here can lose a concurrent writer's record (last save wins).
 * Supabase and MongoDB upsert a single row/document atomically and don't need this;
 * this path re-reads fresh and retries when another writer clobbered our record.
 */
async function upsertIntoArrayStoreWithRetry<T extends object>(
  filename: string,
  record: T,
  idKey: string,
  recordId: string,
  useLiveRead: boolean
): Promise<void> {
  const attempts = 4;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const data = useLiveRead ? await getDB<T>(filename) : readJSON<T>(filename);
    const index = data.findIndex((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
    if (index > -1) data[index] = record;
    else data.push(record);
    await saveDB(filename, data);

    const verify = useLiveRead ? await getDB<T>(filename) : readJSON<T>(filename);
    const stillPresent = verify.some((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
    if (stillPresent) return;
    if (attempt < attempts) await delay(75 + Math.floor(Math.random() * 150));
  }

  throw new Error(`Cannot upsert ${filename}: write was overwritten by a concurrent request after ${attempts} attempts`);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Removes a single record without rewriting the whole collection - matters for
 * high-frequency, high-contention writes like reaction toggles, where a full
 * saveDB() on every unlike would both be wasteful at scale and race against
 * concurrent writers touching other records in the same collection.
 */
export async function deleteDBRecord(
  filename: string,
  recordId: string,
  options?: { idKey?: string }
): Promise<void> {
  const idKey = options?.idKey ?? "id";
  const cleanId = recordId.trim();
  if (!cleanId) throw new Error(`Cannot delete from ${filename}: missing record id`);

  if (shouldUseMemoryCache(filename)) {
    const data = readJSON(filename) as unknown[];
    setMemoryCache(filename, data.filter((item) => String((item as Record<string, unknown>)[idKey] || "") !== cleanId));
  }

  if (hasSupabaseConfig()) {
    try {
      await deleteSupabaseRecord(getCollectionName(filename), cleanId);
      return;
    } catch (error) {
      console.error("Supabase deleteDBRecord error:", error);
      if (!hasMongoConfig() && !hasKVConfig() && requiresPersistentStorage(filename)) {
        throw error instanceof Error ? error : persistentStorageError(filename);
      }
    }
  }

  if (!hasMongoConfig()) {
    if (requiresPersistentStorage(filename) && !hasKVConfig()) {
      throw persistentStorageError(filename);
    }

    await deleteFromArrayStoreWithRetry(filename, idKey, cleanId, hasKVConfig());
    return;
  }

  try {
    const client = await getMongoClient();
    const db = client.db("scds_db");
    const collection = db.collection(getCollectionName(filename));
    await collection.deleteOne({ [String(idKey)]: cleanId });
    return;
  } catch (error) {
    console.error("MongoDB deleteDBRecord error:", error);
    if (requiresPersistentStorage(filename) && !hasKVConfig()) {
      throw error instanceof Error ? error : persistentStorageError(filename);
    }
  }

  await deleteFromArrayStoreWithRetry(filename, idKey, cleanId, true);
}

async function deleteFromArrayStoreWithRetry(
  filename: string,
  idKey: string,
  recordId: string,
  useLiveRead: boolean
): Promise<void> {
  const attempts = 4;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const data = useLiveRead ? await getDB<Record<string, unknown>>(filename) : readJSON<Record<string, unknown>>(filename);
    const next = data.filter((item) => String(item[idKey] || "") !== recordId);
    await saveDB(filename, next);

    const verify = useLiveRead ? await getDB<Record<string, unknown>>(filename) : readJSON<Record<string, unknown>>(filename);
    const stillPresent = verify.some((item) => String(item[idKey] || "") === recordId);
    if (!stillPresent) return;
    if (attempt < attempts) await delay(75 + Math.floor(Math.random() * 150));
  }

  throw new Error(`Cannot delete from ${filename}: write was overwritten by a concurrent request after ${attempts} attempts`);
}

export async function appendDBRecord<T extends object>(
  filename: string,
  record: T,
  options?: { idKey?: string; position?: number }
): Promise<void> {
  await upsertDBRecord(filename, record, options);
}
