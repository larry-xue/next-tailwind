import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function connectToDatabase() {
  if (clientPromise) {
    return clientPromise;
  }

  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  return clientPromise;
}
