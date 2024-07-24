import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";
import { EmailingParams, StripeParams } from "@youmeet/types/api/StripeParams";
import { NextRequest } from "next/server";
import {
  handleCheckoutLoggedIn,
  handleTrialLoggedIn,
  handleTrialLoggedOut,
} from "@youmeet/utils/checkout/functions";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const loginPro = req.cookies.get("loginPro")?.value;
  const trial = query.get("trial");
  const leadId = query.get("leadId");
  const choice = query.get("choice");
  const redirect = query.get("redirect");
  const customer = query.get("customer");

  const params = { trial, leadId, choice, redirect, customer } as StripeParams &
    EmailingParams;
  params.redirect = params.redirect || "compte";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (trial) {
    // si la requête demande un essai gratuit
    if (loginPro) {
      return await handleTrialLoggedIn(loginPro, params);
    } else if (!loginPro) {
      const res = await handleTrialLoggedOut(params);
      return res;
    }
  } else {
    // si la requête ne requiert pas d'essai gratuit
    if (loginPro) {
      return await handleCheckoutLoggedIn(loginPro, params);
    } else {
      return handleRedirect({
        error: {
          type: BACKEND_ERRORS.NO_USER,
          message: BACKEND_MESSAGES.NO_USER,
        },
      });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  const res = Response.json(null, { status: 400 });
  return res;
}

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const loginPro = req.cookies.get("loginPro")?.value;
  const trial = query.get("trial");
  const leadId = query.get("leadId");
  const choice = query.get("choice");
  let redirect = query.get("redirect");
  const customer = query.get("customer");

  const params = {
    trial,
    leadId,
    choice,
    redirect,
    customer,
  } as StripeParams & EmailingParams;
  params.redirect = params.redirect || "compte";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (trial) {
    // si la requête demande un essai gratuit
    if (loginPro) {
      return await handleTrialLoggedIn(loginPro, params);
    } else if (!loginPro) {
      const res = await handleTrialLoggedOut(params);
      return res;
    }
  } else {
    // si la requête ne requiert pas d'essai gratuit
    if (loginPro) {
      return await handleCheckoutLoggedIn(loginPro, params);
    } else {
      return handleRedirect({
        error: {
          type: BACKEND_ERRORS.NO_USER,
          message: BACKEND_MESSAGES.NO_USER,
        },
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  const res = Response.json(null, { status: 400 });
  return res;
}
