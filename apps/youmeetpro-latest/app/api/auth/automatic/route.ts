import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";
import BetaDetails from "@youmeet/models/betaDetails";
import BetaUser from "@youmeet/models/betaUsers";
import Lead from "@youmeet/models/leads";
import { NextRequest, NextResponse } from "next/server";
import { s, verif } from "@youmeet/utils/jwt";
import { dev, uri } from "@youmeet/functions/imports";
import { cookies } from "next/headers";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const leadId = query.get("leadId");
  const qUser = query.get("user");

  if (leadId && qUser) {
    const lead = await Lead.findById(leadId);
    if (lead?.token) {
      const verified = await verif(lead.token);
      if (verified && (verified as LoginCookiePayload).email) {
        if (lead.type === "candidate") {
          const fullname = lead.name;
          const firstname = lead.name.split(" ")[0];
          const lastname = lead.name.split(" ")[1];
          const phone = lead.phone;
          const email = lead.email;
          const linkedinProfileId = lead.linkedinProfileId;

          let user;
          if (email) {
            user = await BetaUser.findOne({ email, user: true });
          } else if (linkedinProfileId) {
            const formatted = linkedinProfileId.includes("/")
              ? linkedinProfileId.replaceAll("/", "")
              : linkedinProfileId;
            user = await BetaUser.findOne({
              linkedinProfileId: formatted,
              user: true,
            });
          }

          if (!user) {
            const newUser = new BetaUser({
              firstname,
              lastname,
              fullname,
              phone,
              email,
              linkedinProfileId,
              user: false,
              pro: true,
            });

            user = await newUser.save();

            const newDetails = new BetaDetails({
              userId: user._id,
              email,
              phone,
            });
            await newDetails.save();
          }

          if (user) {
            const beforeCookie = {
              userId: user._id.toString(),
              email: user.email as string,
              user: false,
              pro: true,
              returnTo: "compte" as string,
            } as { [key: string]: string | undefined | boolean };

            const payload = await s(beforeCookie);

            if (payload) {
              cookies().set("loginPro", payload, {
                domain: `${process.env.API_DOMAIN}`,
              });

              const cookie = cookies().get("loginPro")?.value as string;

              const res = NextResponse.redirect(`${uri}/dashboard`, {
                status: 307,
              });
              res.cookies.set("loginPro", cookie);
              return res;
            } else {
              return handleRedirect({
                error: {
                  type: BACKEND_ERRORS.NO_PAYLOAD,
                  message: BACKEND_MESSAGES.NO_PAYLOAD,
                },
              });
            }
          } else {
            return handleRedirect({
              error: {
                type: BACKEND_ERRORS.NO_USER,
                message: BACKEND_MESSAGES.NO_USER,
              },
            });
          }
        } else {
          return handleRedirect({
            error: {
              type: BACKEND_ERRORS.NOT_CANDIDATE,
              message: BACKEND_MESSAGES.NOT_AUTHORIZED,
            },
          });
        }
      } else {
        return handleRedirect({
          error: {
            type: BACKEND_ERRORS.COOKIE_CORRUPTED,
            message: BACKEND_MESSAGES.COOKIE_CORRUPTED,
          },
        });
      }
    } else {
      return handleRedirect({
        error: {
          type: BACKEND_ERRORS.NO_LEAD,
          message: BACKEND_MESSAGES.NOT_AUTHENTICATED,
        },
      });
    }
  } else {
    return handleRedirect({
      error: {
        type: BACKEND_ERRORS.NO_QUERY,
        message: BACKEND_MESSAGES.UNKNOWN,
      },
    });
  }
}
