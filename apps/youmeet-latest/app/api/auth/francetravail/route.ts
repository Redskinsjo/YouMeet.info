import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.toString(), "req.url");

  const code = req.nextUrl.searchParams.get("code");
  const uri =
    "https://authentification-candidat.francetravail.fr/connexion/oauth2/access_token/individu";
  const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
  const client_secret = `${process.env.FRANCE_TRAVAIL_CLIENT_SECRET}`;
  const redirect_uri = "https://www.youmeet.info/api/auth/francetravail";
  const response = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      client_id,
      client_secret,
      redirect_uri,
    }),
  });
  const data = await response.json();
  console.log(data, "data");
  return Response.json("Hello, world!");
}
