import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";
import { NextRequest, NextResponse } from "next/server";
import { s } from "@youmeet/utils/basics/jwt";
import { uri } from "@youmeet/functions/imports";
import { cookies } from "next/headers";
import {
  createAffiliation,
  createDetails,
  createUser,
  getAffiliation,
  getLead,
  getSimpleUser,
  updateUser,
} from "@youmeet/functions/request";
import {
  Affiliation,
  BetaDetails,
  BetaUser,
  Lead,
} from "@youmeet/gql/generated";
import { setUniqueNameAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const leadId = query.get("leadId");
  const qUser = query.get("user");

  const params = { leadId, user: qUser };

  try {
    if (params.leadId && params?.user) {
      const lead = (await getLead<Lead>({ id: params.leadId })) as Lead;

      if (lead?.token) {
        const verified = await verifyTokenServer(lead.token);

        if (lead.type === "candidate") {
          const fullname = lead.name;
          const firstname = lead.name?.split(" ")[0];
          const lastname = lead.name?.split(" ")[1];
          const phone = lead.phone;
          const email = lead.email;
          const linkedinProfileId = lead.linkedinProfileId;
          const parentId = lead.parent?.id;

          let user = (await getSimpleUser<BetaUser>({ email })) as BetaUser;

          let affiliation;
          if (parentId) {
            affiliation = (await getAffiliation<Affiliation>({
              parentId,
            })) as Affiliation;
            if (!affiliation) {
              affiliation = (await createAffiliation<Affiliation>(
                {
                  parentId,
                },
                0
              )) as Affiliation;
            }
          }

          if (!user) {
            const affiliate = {} as {
              affiliationId: string;
            };
            if (affiliation) affiliate.affiliationId = affiliation.id as string;
            const { uniqueName, extension } = await setUniqueNameAndExtension(
              firstname || "",
              lastname || "",
              0
            );

            user = (await createUser<BetaUser>({
              data: {
                firstname,
                lastname,
                fullname,
                email,
                uniqueName,
                extension,
                linkedinProfileId,
                user: true,
                pro: false,
                ...affiliate,
              },
            })) as BetaUser;

            if (user) {
              (await createDetails<BetaDetails>({
                data: { userId: user.id, email, phone },
              })) as BetaDetails;
            }
          }

          if (!user.user) {
            (await updateUser<BetaUser>({
              userId: user.id,
              data: { user: true },
            })) as BetaUser;
          }

          if (user) {
            const beforeCookie = {
              userId: user.id,
              email: user.email as string,
              user: true,
              pro: false,
              returnTo: "compte" as string,
            } as { [key: string]: string | undefined | boolean };

            const payload = await s(beforeCookie);

            if (payload) {
              cookies().set("login", payload, {
                domain: process.env.API_DOMAIN,
              });

              const cookie = cookies().get("login")?.value as string;

              const res = NextResponse.redirect(`${uri}/dashboard`, {
                status: 307,
              });
              res.cookies.set("login", cookie);
              return res;
            } else {
              throw new BackendError(
                BACKEND_ERRORS.NO_PAYLOAD,
                BACKEND_MESSAGES.NO_PAYLOAD
              );
            }
          } else {
            throw new BackendError(
              BACKEND_ERRORS.NO_USER,
              BACKEND_MESSAGES.NO_USER
            );
          }
        } else {
          throw new BackendError(
            BACKEND_ERRORS.NOT_CANDIDATE,
            BACKEND_MESSAGES.NOT_AUTHORIZED
          );
        }
      } else {
        throw new BackendError(
          BACKEND_ERRORS.NO_LEAD,
          BACKEND_MESSAGES.NOT_AUTHENTICATED
        );
      }
    } else {
      throw new BackendError(BACKEND_ERRORS.NO_QUERY, BACKEND_MESSAGES.UNKNOWN);
    }
  } catch (err: any) {
    return handleRedirect(
      {
        error: {
          type: err.type,
          message: err.message,
        },
      },
      err.uri
    );
  }
}
