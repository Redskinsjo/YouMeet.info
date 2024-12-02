import { NextRequest, NextResponse } from "next/server";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uri } from "@youmeet/functions/imports";

export async function GET(req: NextRequest) {
  const verified = await verifyTokenServer();
  if (verified) {
    const name = process.env.APP === "candidate" ? "login" : "loginPro";
    (await cookies()).delete({
      name: name,
      path: "/",
      domain: `${process.env.API_DOMAIN}`,
    });
    revalidatePath("/");
    revalidatePath("/se-connecter");
    const res = NextResponse.redirect(new URL("/", uri));
    if (res.cookies.has(name)) res.cookies.delete(name);

    return res;
  }
  return Response.json({ data: "Not authenticated" }, { status: 400 });
}
