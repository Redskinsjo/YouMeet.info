import { google } from "googleapis";
import { s } from "@youmeet/utils/basics/jwt";
import { setName } from "@youmeet/utils/basics/setName";
import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";
import { parsePrms } from "@youmeet/utils/backoffice/parseParams";
import { setUniqueNameAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import { DocumentType } from "@typegoose/typegoose";
import { NextRequest, NextResponse } from "next/server";
import { dev, uri } from "@youmeet/functions/imports";
import BetaDetails from "@youmeet/models/betaDetails";
import BetaUser, { BetaUserSchema } from "@youmeet/models/betaUsers";
import { cookies } from "next/headers";
import languagesJSON from "@youmeet/raw-data/languages.json";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { createError } from "@youmeet/functions/request";

const regex = new RegExp(
  /[a-zA-Z0-9\._-]{3,}@gmail|aol|yahoo|outlook|hotmail|protonmail|mail|yandex|zoho|gmx\.[a-z]{2,}/gm
);

const personalRegex = new RegExp(/jonathan.carnos@gmail.com/gim);

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const state = query.get("state") as string;
  let code = query.get("code");

  const oauth2Client = new google.auth.OAuth2(
    `${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
    `${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`,
    `${uri}/api/auth/google/store`
  );

  let userPayload, customer;
  let firstname,
    lastname,
    fullname,
    picture = "";
  let languages: string[] = [];
  let emails = [];

  if (code) {
    try {
      const tokenData = await oauth2Client.getToken(code);
      const { tokens } = tokenData;
      oauth2Client.setCredentials(tokens);

      google.options({ auth: oauth2Client });

      const peopleApi = google.people("v1");

      const response = await peopleApi.people.get({
        personFields:
          "emailAddresses,names,photos,phoneNumbers,locales,birthdays,clientData,biographies,ageRanges",
        resourceName: "people/me",
      });
      if (response && response.status === 200) {
        if (response.data && response.data.emailAddresses) {
          emails = response.data?.emailAddresses.map(
            (obj) => obj.value as string
          );

          let access_token = tokens.access_token;
          let expiry_date = tokens.expiry_date;
          let refresh_token = tokens.refresh_token;
          if (tokens.access_token && tokens.expiry_date) {
            const now = new Date().getTime();

            if (now > Number(expiry_date)) {
              const credentials = (await oauth2Client.refreshAccessToken())
                ?.credentials;

              if (credentials.access_token && credentials.expiry_date) {
                access_token = credentials.access_token as string;
                expiry_date = credentials.expiry_date as number;
                refresh_token = credentials.refresh_token;
              }
            }
          }

          let user = await BetaUser.findOne({
            email: emails[0],
            user: true,
          });

          if (!user) {
            user = await BetaUser.findOne({
              email: emails[0],
            });
          }

          // créer un user si il ne s'est encore jamais connecté chez nous

          if (response.data?.names) {
            const obj = response.data?.names[0];
            firstname = obj.givenName || "";
            lastname = obj.familyName || "";
            fullname = setName({ firstname, lastname } as any);
          }

          // créer un user si il ne s'est encore jamais connecté chez nous
          if (!user) {
            if (response.data?.locales) {
              languages = response.data?.locales.map(
                (locale) =>
                  (languagesJSON as any)[locale.value as string].name as string
              );
            }

            if (response.data?.photos) {
              const obj = response.data?.photos[0];
              picture = obj.url as string;
            }

            if (firstname || lastname || fullname || picture) {
              const credit = 0;

              const { uniqueName, extension } = await setUniqueNameAndExtension(
                firstname || "",
                lastname || "",
                0
              );

              userPayload = {
                firstname,
                lastname,
                fullname,
                email: emails[0],
                picture,
                credit,
                user: true,
                languages,
                auth: {
                  social: {
                    accessToken: access_token || null,
                    refreshToken: refresh_token || null,
                    expiryDate: expiry_date || null,
                  },
                },
                uniqueName,
                extension,
                professionalEmail:
                  !regex.test(emails[0]) || personalRegex.test(emails[0]),
              } as Partial<DocumentType<BetaUserSchema>>;
            }

            const newUser = new BetaUser(userPayload);
            user = await newUser.save();
          } else {
            user = await BetaUser.findByIdAndUpdate(user._id, {
              auth: {
                ...user.auth,
                social: {
                  accessToken: access_token || null,
                  refreshToken: refresh_token || null,
                  expiryDate: expiry_date || null,
                },
              },
              firstname,
              lastname,
              fullname: firstname + " " + lastname,
              user: true,
            });
          }

          if (user) {
            const detailsExists = await BetaDetails.findOne({
              userId: user._id,
            });
            if (!detailsExists) {
              const detailsSchema = new BetaDetails({
                email: emails[0],
                userId: user._id,
              });

              await detailsSchema.save();
            }
            // si le nouvel utilisateur n'a pas été créé, rare
          } else {
            const payload = {
              type: BACKEND_ERRORS.NO_USER,
              message: BACKEND_MESSAGES.NO_USER,
            };
            return handleRedirect({
              error: payload,
            });
          }

          if (!user?.user) {
            user = await BetaUser.findById(user?._id);
          }

          const redirect = parsePrms(state).redirect;
          let returnTo = redirect ? decodeURIComponent(redirect) : "dashboard";
          if (returnTo.includes("%")) returnTo = decodeURIComponent(returnTo);
          if (returnTo.includes("%")) returnTo = decodeURIComponent(returnTo);

          if (returnTo[0] === "/") returnTo = returnTo.slice(1);

          const createDate = new Date(user.createdAt).getTime();
          const today = new Date().getTime();
          const oneDay = 1000 * 3600 * 24;
          if (createDate > today - oneDay) {
            returnTo = `${returnTo}?new=true`;
          }

          const beforeCookie = {
            email: emails[0],
            customerId: user?.customerId
              ? user.customerId
              : customer
              ? (customer as any).id
              : undefined,
            userId: user?._id?.toString() || "",
            pro: user?.pro ?? false,
            user: user?.user ?? false,
            returnTo,
            companyId: user?.companyId?.toString() || "",
            scrapped: (user?.scrapped as boolean) ?? false,
            uniqueName: user.uniqueName,
          };

          const payload = await s(beforeCookie);

          if (payload) {
            (await cookies()).set("login", payload, {
              path: "/",
              domain: process.env.API_DOMAIN,
            });

            const cookie = (await cookies()).get("login")?.value as string;

            const res = NextResponse.redirect(`${uri}/${returnTo}`, {
              status: 307,
            });
            res.cookies.set("login", cookie, {
              domain: process.env.API_DOMAIN,
            });

            return res;
          } else {
            return handleRedirect({
              error: {
                type: BACKEND_ERRORS.NO_PAYLOAD,
                message: BACKEND_MESSAGES.NO_PAYLOAD,
              },
            });
          }
        }
      } else {
        return handleRedirect({
          error: {
            type: BACKEND_ERRORS.GOOGLE_ERROR,
            message: BACKEND_MESSAGES.GOOGLE_ERROR,
          },
        });
      }
    } catch (err: any) {
      await createError({
        data: {
          environment: dev ? "development" : "production",
          message: err.message,
          pro: false,
          query: "unknown",
          status: err.status,
          statusText: err.statusText ?? "",
          type: err.type,
        },
      });
      return handleRedirect({
        error: {
          type: BACKEND_ERRORS.UNKNOWN,
          message: err.message,
        },
      });
    }
  }
  return handleRedirect({
    error: {
      type: BACKEND_ERRORS.UNKNOWN,
      message: BACKEND_MESSAGES.UNKNOWN,
    },
  });
}
