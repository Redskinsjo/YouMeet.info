import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { verif } from "@youmeet/utils/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOneMeet, sendEmail } from "@youmeet/functions/request";
import { Email, Meet } from "@youmeet/gql/generated";
import { choseCookie } from "@youmeet/utils/choseCookie";
import { setName } from "@youmeet/utils/setName";

export async function middleware(request: NextRequest) {
  const privatePages = [
    "formulaire-profil",
    "dashboard",
    "reinitialiser-mot-de-passe",
    "creer-offre",
    "profils",
    "compte",
    "mes-offres",
    "mes-candidats",
    "mes-favoris",
    "videos",
  ];
  const pages = [
    "le-produit",
    "les-prix",
    "favicon.ico",
    "se-connecter",
    ...privatePages,
  ];
  const pathname = request.nextUrl.pathname;
  let cookie = choseCookie(pathname, request.cookies);

  const redirect = pathname + request.nextUrl.search;

  ////////////////////////// 1
  // Check if the path is a candidate profile

  const regex = new RegExp(/(?<=\/)[^\/]+/i);
  // all paths /*****
  if (regex.test(pathname)) {
    const match = pathname.match(regex);
    if (match) {
      // what is the matched path /****
      const m = match[0];

      // if the path is not in the list of pages
      if (!pages.includes(m)) {
        const meet = (await getOneMeet<Meet>({ id: m }, 0)) as Meet;

        if (meet) {
          cookie = choseCookie(pathname, request.cookies, true);
          const proCookie = choseCookie(pathname, request.cookies);

          let specialAuthorized = false;
          if (proCookie?.value) {
            const proCookieVerified = await verif(proCookie?.value);
            if (
              (proCookieVerified as LoginCookiePayload).email.toLowerCase() ===
              "jonathan.carnos@gmail.com"
            ) {
              specialAuthorized = true;
            }
          }

          if (cookie?.value || specialAuthorized) {
            const toVerify = specialAuthorized
              ? (proCookie?.value as string)
              : (cookie?.value as string);
            const verified = await verif(toVerify);

            if ((verified as LoginCookiePayload).userId) {
              if ((verified as LoginCookiePayload).pro) {
                if (
                  (verified as LoginCookiePayload).email ===
                    meet.meetRecruiter?.email ||
                  (verified as LoginCookiePayload).email.toLowerCase() ===
                    "jonathan.carnos@gmail.com"
                ) {
                  if (!specialAuthorized) {
                    (await sendEmail({
                      data: {
                        email: "jonathan.carnos@gmail.com",
                        name: "Jonathan Carnos",
                        link: `https://pro.youmeet.info/api/meet?email=jonathan.carnos@gmail.com&token${meet.token}`,
                        templateId: 33,
                        recruiterName: setName(meet.meetRecruiter),
                      },
                    })) as Email;
                  }
                  return NextResponse.next();
                }
              }
            }
          }

          return NextResponse.redirect(new URL(`/dashboard`, request.url));
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

  if (cookie?.value) {
    const verified = await verif(cookie?.value);

    if ((verified as LoginCookiePayload)?.userId) {
      if ((verified as LoginCookiePayload).pro) return NextResponse.next();
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
    "/:meetId/:path",
    "/formulaire-profil",
    "/dashboard",
    "/reinitialiser-mot-de-passe",
    "/creer-offre",
    "/profils/:path*",
    "/compte",
    "/mes-offres",
    "/mes-candidats",
    "/mes-favoris",
    "/videos/:path",
  ],
};
