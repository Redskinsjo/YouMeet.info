import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.url, "req.url");
  return Response.json("Hello, world!");
}
