import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.VITE_MONGO_URI ?? import.meta.env.VITE_MONGO_URI)

await client.connect();

export const db = client.db("demo");
export const todos = db.collection("todos");