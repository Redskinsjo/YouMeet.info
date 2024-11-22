import { google } from "googleapis";
import { NextRequest } from "next/server";
import { uri } from "@youmeet/functions/imports";
import { renderUrlQuery } from "@youmeet/utils/basics/renderUrlQuery";

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const id = query.get("id") as string;
  const email = query.get("email") as string;
  const customer = query.get("customer") as string;
  const redirect = query.get("redirect") as string;
  const choice = query.get("choice") as string;

  const oauth2Client = new google.auth.OAuth2(
    `${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
    `${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`,
    `${uri}/api/auth/google/store`
  );

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["openid", "email", "profile"];
  // "https://www.googleapis.com/auth/contacts.readonly",

  const search = new URLSearchParams({
    id,
    email,
    customer,
    redirect,
    choice,
  });
  const state = search.toString();

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    state,
    // If you only need one scope you can pass it as a string
    scope: scopes,
    redirect_uri: `${uri}/api/auth/google/store`,
  });

  return new Response(null, {
    status: 307,
    headers: { Location: `${url}` },
  });
}
