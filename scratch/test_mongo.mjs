import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the URI from .env.local
const envPath = join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const uriMatch = envContent.match(/MONGODB_URI="?([^"\n]+)"?/);
const uri = uriMatch?.[1];

if (!uri) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

console.log("🔗 Connecting to MongoDB Atlas...");
const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("✅ Connected successfully!");

  const db = client.db("scds_db");
  const collections = await db.listCollections().toArray();
  console.log("📚 Collections:", collections.map((c) => c.name).join(", ") || "(none yet)");

  const students = await db.collection("students").countDocuments();
  const enrollments = await db.collection("enrollments").countDocuments();
  const messages = await db.collection("messages").countDocuments();

  console.log(`👨‍🎓 students: ${students}`);
  console.log(`📝 enrollments: ${enrollments}`);
  console.log(`💬 messages: ${messages}`);

  // Show a sample student if any exist
  if (students > 0) {
    const sample = await db.collection("students").findOne({}, { projection: { password: 0 } });
    console.log("🔍 Sample student:", JSON.stringify(sample, null, 2));
  }
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
} finally {
  await client.close();
  console.log("🔒 Connection closed.");
}
