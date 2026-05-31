import fs from "fs";
import path from "path";
import getMongoClient from "./mongodb";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function getCollectionName(filename: string): string {
  return filename.replace(".json", "");
}

type MemoryDB = Record<string, unknown[]>;
const globalDb = globalThis as typeof globalThis & { memoryDB?: MemoryDB };
const memoryDB: MemoryDB = globalDb.memoryDB ?? (globalDb.memoryDB = {});

export function readJSON<T>(filename: string): T[] {
  if (memoryDB[filename]) return memoryDB[filename] as T[];

  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as T[];
    memoryDB[filename] = data as unknown[];
    return data;
  } catch {
    return [];
  }
}

export async function getDB<T>(filename: string): Promise<T[]> {
  if (memoryDB[filename]) return memoryDB[filename] as T[];

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
    memoryDB[filename] = data as unknown[];
    return data;
  } catch (error) {
    console.error("MongoDB getDB error:", error);
    return readJSON<T>(filename);
  }
}

export async function saveDB<T>(filename: string, data: T[]): Promise<void> {
  memoryDB[filename] = data as unknown[];

  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Local file write is optional when MongoDB is available
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
