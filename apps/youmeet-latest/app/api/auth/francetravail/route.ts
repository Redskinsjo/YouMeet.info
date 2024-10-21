import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.toString(), "req.url");

  const code = req.nextUrl.searchParams.get("code");
  const uri =
    "https://authentification-candidat.francetravail.fr/connexion/oauth2/access_token/individu";
  const response = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
    }),
  });
  return Response.json("Hello, world!");
}
