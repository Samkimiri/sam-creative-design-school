import fs from "fs";
import path from "path";
import getMongoClient, { hasMongoConfig } from "./mongodb";
import {
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
const globalDb = globalThis as typeof globalThis & { memoryDB?: MemoryDB };
const memoryDB: MemoryDB = globalDb.memoryDB ?? (globalDb.memoryDB = {});
const HIGH_WRITE_FILES = new Set([
  "analytics-events.json",
  "analytics-sessions.json",
  "enrollments.json",
  "messages.json",
  "site-settings.json",
]);
const legacyLookupTimeoutMs = Number(process.env.SCDS_LEGACY_DB_TIMEOUT_MS || 1800);

function shouldUseMemoryCache(filename: string) {
  return !HIGH_WRITE_FILES.has(filename);
}

export function readJSON<T>(filename: string): T[] {
  if (shouldUseMemoryCache(filename) && memoryDB[filename]) return memoryDB[filename] as T[];

  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as T[];
    if (shouldUseMemoryCache(filename)) memoryDB[filename] = data as unknown[];
    return data;
  } catch {
    return [];
  }
}

export async function getDB<T>(filename: string): Promise<T[]> {
  if (shouldUseMemoryCache(filename) && memoryDB[filename]) return memoryDB[filename] as T[];

  if (hasSupabaseConfig()) {
    try {
      const collection = getCollectionName(filename);
      const data = await getSupabaseCollection<T>(collection);

      if (data.length === 0) {
        const fallbackData = readJSON<T>(filename);
        if (fallbackData.length > 0) {
          await saveSupabaseCollection(collection, fallbackData);
          memoryDB[filename] = fallbackData as unknown[];
          return fallbackData;
        }
      }

      if (shouldUseMemoryCache(filename)) memoryDB[filename] = data as unknown[];
      return data;
    } catch (error) {
      console.error("Supabase getDB error:", error);
      return readJSON<T>(filename);
    }
  }

  if (!hasMongoConfig()) {
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
        memoryDB[filename] = fallbackData as unknown[];
        return fallbackData;
      }
      return [];
    }

    const data = documents.map((doc) => {
      const { _id: _unused, ...rest } = doc as Record<string, unknown> & { _id?: unknown };
      void _unused;
      return rest as T;
    });
    if (shouldUseMemoryCache(filename)) memoryDB[filename] = data as unknown[];
    return data;
  } catch (error) {
    console.error("MongoDB getDB error:", error);
    return readJSON<T>(filename);
  }
}

export async function getDBRecord<T>(filename: string, recordId: string): Promise<T | null> {
  if (!recordId.trim()) return null;

  if (hasSupabaseConfig()) {
    try {
      return await getSupabaseRecord<T>(getCollectionName(filename), recordId.trim());
    } catch (error) {
      console.error("Supabase getDBRecord error:", error);
      const data = readJSON<T>(filename);
      return data.find((item) => String((item as Record<string, unknown>).id || "") === recordId.trim()) ?? null;
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
    (memoryDB[filename] as T[] | undefined)?.find((item) =>
      String((item as Record<string, unknown>)[field] || "").trim().toLowerCase() === cleanValue.toLowerCase()
    ) ?? null;

  const cached = findInMemory();
  if (cached) return cached;

  if (filename === "students.json") {
    const localData = readJSON<T>(filename);
    const localMatch = localData.find((item) =>
      String((item as Record<string, unknown>)[field] || "").trim().toLowerCase() === cleanValue.toLowerCase()
    );
    if (localMatch) return localMatch;
  }

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
  if (shouldUseMemoryCache(filename)) memoryDB[filename] = data as unknown[];

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
    }
  }

  if (!hasMongoConfig()) {
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
    const data = memoryDB[filename] ?? readJSON<T>(filename) as unknown[];
    const index = data.findIndex((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
    if (index > -1) data[index] = record as unknown;
    else data.push(record as unknown);
    memoryDB[filename] = data;
  }

  if (hasSupabaseConfig()) {
    try {
      await upsertSupabaseRecord(getCollectionName(filename), recordId, record, options?.position);
      return;
    } catch (error) {
      console.error("Supabase upsertDBRecord error:", error);
    }
  }

  if (!hasMongoConfig()) {
    const data = await getDB<T>(filename);
    const index = data.findIndex((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
    if (index > -1) data[index] = record;
    else data.push(record);
    await saveDB(filename, data);
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
  }

  const data = await getDB<T>(filename);
  const index = data.findIndex((item) => String((item as Record<string, unknown>)[idKey] || "") === recordId);
  if (index > -1) data[index] = record;
  else data.push(record);
  await saveDB(filename, data);
}

export async function appendDBRecord<T extends object>(
  filename: string,
  record: T,
  options?: { idKey?: string; position?: number }
): Promise<void> {
  await upsertDBRecord(filename, record, options);
}
