import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    code: 100000,
    message: "success",
    result: [
      {
        done: false,
        content: "qwe",
      },
    ],
  });
}
