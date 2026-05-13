import fs from "fs";
import path from "path";

import { getData, setData } from "./kv";

const DATA_DIR = path.join(process.cwd(), "src", "data");

// Use globalThis to persist the memory database across hot-reloads and API calls on Vercel
const memoryDB = (globalThis as any).memoryDB || ((globalThis as any).memoryDB = {});

export function readJSON<T>(filename: string): T[] {
  // Return from memory if we've written to it in this process
  if (memoryDB[filename]) return memoryDB[filename] as T[];

  const filePath = path.join(DATA_DIR, filename);
  const adminAccount = {
    id: "admin-1",
    name: "Samuel Kimiri",
    email: "samcreativegraphics7@gmail.com",
    phone: "0743475247",
    password: "$2a$10$fAxBhuOHwWD3AjY7U95HyuPZiPCLv0ND.fQdzkLtoKgVhE2Nyh7My", // Password: SamCreative@2026
    role: "admin",
    enrolledCourses: ["photoshop-masterclass", "illustrator-training", "capcut-masterclass", "solidworks-engineers"],
    createdAt: new Date().toISOString()
  };

  try {
    if (!fs.existsSync(filePath)) {
      if (filename === "students.json") return [adminAccount] as unknown as T[];
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as T[];
    
    // Ensure admin exists in student list
    if (filename === "students.json") {
      const hasAdmin = data.some((s: any) => s.email === adminAccount.email);
      if (!hasAdmin) return [adminAccount, ...data] as unknown as T[];
    }
    
    return data;
  } catch {
    if (filename === "students.json") return [adminAccount] as unknown as T[];
    return [];
  }
}

/**
 * Async version for True Persistence (Vercel KV)
 */
export async function getDB<T>(filename: string): Promise<T[]> {
  const localData = readJSON<T>(filename);
  return await getData<T>(filename, localData);
}

export async function saveDB<T>(filename: string, data: T[]): Promise<void> {
  // 1. Update Memory Cache (Sync)
  memoryDB[filename] = data;
  
  // 2. Try to update Vercel KV (Async)
  await setData(filename, data);

  // 3. Try to update Local File (Sync - fails on Vercel)
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // Expected on Vercel
  }
}

export function writeJSON<T>(filename: string, data: T[]): void {
  // Fire and forget for sync compatibility, but background persistence happens
  saveDB(filename, data); 
}
