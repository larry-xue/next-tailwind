import { Collection, Db, MongoClient, MongoDBNamespace } from "mongodb";
import connectToDatabase from "../mongoose";

interface TodoSchema {
  done: boolean;
  content: string;
  date: Date;
}

let client: MongoClient;
let db: Db;
let todos: Collection<TodoSchema>;

async function init() {
  if (db) return;
  try {
    client = await connectToDatabase();
    db = client.db();
    todos = db.collection("todo");
  } catch (err) {
    throw new Error("Failed to stablish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getTodos(filter: { page: number; pagesize: number }) {
  try {
    if (!todos) await init();
    const data = await todos
      .find({})
      .skip(filter.pagesize * filter.page)
      .limit(filter.pagesize)
      .toArray();

    const result = data.map((item) => ({
      id: item._id,
      content: item.content,
      date: item.date,
      done: item.done,
    }));

    return { code: 200, result, message: "success", ...filter };
  } catch (err) {
    return { code: 401, message: "Failed to fetch todos" };
  }
}

export async function addTodo(item: TodoSchema) {
  try {
    if (!todos) await init();
    const result = await todos.insertOne(item);
    return { result };
  } catch (err) {
    return { error: "Failed to add todo" };
  }
}
