import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { verif } from "@youmeet/utils/basics/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createProfileView,
  getOneQueue,
  getUser,
} from "@youmeet/functions/request";
import { BetaQueue, BetaUser } from "@youmeet/gql/generated";
import { choseCookie } from "@youmeet/utils/basics/choseCookie";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let cookie = choseCookie(pathname, request.cookies);

  const redirect = pathname + request.nextUrl.search;

  ////////////////////////// 1
  // Check if the path is a candidate profile

  const regex = new RegExp(/(?<=\/)[^\/]+/i);
  // all paths /*****
  if (regex.test(pathname)) {
    const privatePages = [
      "dashboard",
      "backoffice",
      "formulaire-profil",
      "enregistrer",
      "reinitialiser-mot-de-passe",
    ];
    const pages = [
      "le-produit",
      "with",
      "blog",
      "competences",
      "favicon.ico",
      "conditions-generales-utilisation",
      "medias",
      "offres",
      "regles-de-confidentialite",
      "se-connecter",
      "ajouter-video",
      "robots.txt",
      "message",
      ...privatePages,
    ];
    const match = pathname.match(regex);
    if (match) {
      // what is the matched path /****
      const m = match[0];

      // if the path is not in the list of pages
      if (!pages.includes(m)) {
        const user = (await getUser<BetaUser>(
          { uniqueName: m },
          0
        )) as BetaUser;

        if (user) {
          if (cookie?.value) {
            const verified = await verif(cookie?.value);
            if ((verified as LoginCookiePayload).userId) {
              if ((verified as LoginCookiePayload).user) {
                if ((verified as LoginCookiePayload).uniqueName === m) {
                  return NextResponse.next();
                }
              }
            }
          }

          await createProfileView({ data: { userId: user.id } });
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/dashboard`, request.url));
      } else {
        // if the path is in the list of pages
        if (!privatePages.includes(m)) {
          //if the path is not a private page
          return NextResponse.next();
        }
      }
    }
  }

  ////////////////////////// 1

  if (cookie?.value) {
    const verified = await verif(cookie?.value);
    if ((verified as LoginCookiePayload).userId) {
      if ((verified as LoginCookiePayload).user) {
        const queueIdRegex = new RegExp(
          /(?<=\/dashboard\/conversations\/)[^\/]{1,}/,
          "gm"
        );
        const matchQueueId = queueIdRegex.test(pathname);

        if (matchQueueId) {
          const match = pathname.match(queueIdRegex);
          if (match) {
            const queueId = match[0];
            const queue = (await getOneQueue<BetaQueue>({
              id: queueId,
            })) as BetaQueue;
            if (queue?.target?.id === (verified as LoginCookiePayload).userId) {
              return NextResponse.next();
            } else {
              return NextResponse.redirect(new URL(`/dashboard`, request.url));
            }
          }
        } else return NextResponse.next();
      }
    }
  }

  return NextResponse.redirect(
    new URL(
      `/se-connecter?redirect=${encodeURIComponent(redirect)}`,
      request.url
    )
  );
}

export const config = {
  matcher: [
    "/:candidateName/:path",
    "/formulaire-profil",
    "/dashboard/:path*",
    "/backoffice/:path*",
    "/reinitialiser-mot-de-passe",
  ],
};
