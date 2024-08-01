import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const cookies = req.cookies;

  if (cookies?.has("loginPro")) {
    const res = NextResponse.json({
      message: "Cookie supprimé",
      success: true,
    });
    res.cookies.delete("loginPro");
    if (!res.cookies.get("loginPro")) {
      console.log("in route", res.cookies.get("loginPro"));
      return res;
    }
    console.log("Cookie n'a pas été supprimé");
    return Response.json({
      message: "Cookie n'a pas été supprimé",
      success: true,
    });
  }

  return Response.json({ message: "Pas de cookie", success: true });
}
