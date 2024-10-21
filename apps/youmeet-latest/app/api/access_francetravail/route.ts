import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const uri =
    "https://entreprise.francetravail.fr/connexion/oauth2/access_token";
  const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
  const client_secret = `${process.env.FRANCE_TRAVAIL_CLIENT_SECRET}`;
  const params = new URLSearchParams({ realm: "/partenaire" });
  const grant_type = "client_credentials";
  const scope = "api_offresdemploiv2 o2dsoffre";
  const body = new URLSearchParams({
    grant_type,
    client_id,
    client_secret,
    scope,
  });
  console.log(body.toString(), "body");

  const endpoint = uri + "?" + params.toString();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  console.log(response, "response");
  const data = await response.json();
  console.log(data, "data");
  return Response.json(data);
}
