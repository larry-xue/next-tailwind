import { getTodos, addTodo } from "@/db/model/todo";
import { NextRequest, NextResponse } from "next/server";

// TODO: How to use GET POST function
export async function GET(
  req: NextRequest,
  context: {
    params: { id: string };
  }
) {
  let page = 10,
    pagesize = 10;
  const searchParams = req.nextUrl.searchParams;
  if (searchParams.has("page")) page = +(searchParams.get("page") || 10);
  if (searchParams.has("pagesize"))
    pagesize = +(searchParams.get("pagesize") || 0);

  const result = await getTodos({ page, pagesize });
  return NextResponse.json(result, { status: result.code });
}

export async function POST(req: NextRequest) {
  const todo = (await req.json()) as {
    content: string;
    done: boolean;
  };
  let res;
  if (Reflect.has(todo, "content") && Reflect.has(todo, "done")) {
    res = await addTodo({ ...todo, date: new Date() });
    return NextResponse.json(res);
  } else return NextResponse.json({ message: "failed to add" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
      responseLimit: false,
    },
  },
};
