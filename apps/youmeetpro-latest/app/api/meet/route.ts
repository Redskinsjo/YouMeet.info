import { uri, uriCandidates } from "@youmeet/functions/imports";
import { NextRequest, NextResponse } from "next/server";
import Meet from "@youmeet/models/meets";
import { s } from "@youmeet/utils/jwt";
import { cookies } from "next/headers";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const email = search.get("email")?.toLowerCase();
  let token = decodeURIComponent(search.get("token") || "");
  if (email && token) {
    console.log(token, "token", email);
    token = token.replaceAll(" ", "+");
    const meet = await Meet.findOne({ token }).populate([
      "meetCandidateId",
      "meetRecruiterId",
    ]);
    console.log(meet, "meet");
    const recruiter = meet?.meetRecruiterId;

    if (
      meet &&
      (recruiter.email === email ||
        email.toLowerCase() === "jonathan.carnos@gmail.com")
    ) {
      if (!meet.expired) {
        const beforeCookie = {
          userId: recruiter._id.toString(),
          email: recruiter.email,
          expired: meet.expired,
          pro: true,
        };

        const payload = await s(beforeCookie);

        if (payload) {
          cookies().set("meet", payload, {
            domain: `${process.env.API_DOMAIN}`,
          });

          const cookie = cookies().get("meet")?.value as string;

          const res = NextResponse.redirect(`${uri}/${meet._id.toString()}`, {
            status: 307,
          });
          res.cookies.set("meet", cookie);

          return res;
        }
      } else {
        return NextResponse.redirect(new URL("/?expired=true", uriCandidates));
      }
    } else {
      return NextResponse.redirect(new URL("", uriCandidates));
    }
  }
  return NextResponse.redirect(new URL("", uriCandidates));
}
