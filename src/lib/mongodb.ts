import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI || process.env.SCDS_DB_MONGODB_URI;

type GlobalMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let productionPromise: Promise<MongoClient> | undefined;

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(
      new Error(
        'Invalid/Missing environment variable: "MONGODB_URI" or "SCDS_DB_MONGODB_URI"'
      )
    );
  }

  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });

  return client.connect().catch((err) => {
    const globalWithMongo = global as GlobalMongo;
    delete globalWithMongo._mongoClientPromise;
    productionPromise = undefined;
    throw err;
  });
}

export default function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as GlobalMongo;
    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = createClientPromise();
    }
    return globalWithMongo._mongoClientPromise;
  }

  if (!productionPromise) {
    productionPromise = createClientPromise();
  }
  return productionPromise;
}
