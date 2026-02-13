import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = {
    conn: null,
    promise: null,
  };
  globalForMongoose.mongoose = cached;
}

export async function connectDB() {
  if (cached?.conn) return cached.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGO_URI);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export {};
