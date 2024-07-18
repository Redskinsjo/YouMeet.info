import {
  createUser,
  getLead,
  getUser,
  updateUser,
} from "@/app/_functions/request";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import setUniqueNameAndExtension from "@/utils/backoffice/setUniqueNameAndExtension";
import { isProfessionalEmail } from "@/utils/isProfessionalEmail";
import { EmailingParams, StripeParams } from "@youmeet/types/api/StripeParams";
import { BackendError } from "../BackendErrorClass";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import verifyTokenServer from "../verifyTokenServer";
import {
  createCustomer,
  createSession,
  createSubscription,
  getCustomer,
} from "./stripe";
import { setCookieAndTerminate } from "../setCookieAndTerminate";
import { formatReturnTo } from "../formatReturnTo";
import { NextResponse } from "next/server";
import { handleRedirect } from "../backoffice/classic-login";
import { setName } from "../setName";

const processChoice = async (
  customer: any,
  user: BetaUser,
  params: StripeParams & EmailingParams,
) => {
  try {
    if (params.choice === "premium") {
      const subscription = await createSubscription(customer.id, true);
      if (!subscription) {
        throw new BackendError(
          BACKEND_ERRORS.UNKNOWN,
          BACKEND_MESSAGES.UNKNOWN,
          undefined,
          "dashboard",
        );
      }
      const updated = (await updateUser<BetaUser>({
        data: { trial: true },
        userId: user.id,
      })) as BetaUser;
      if (!updated) {
        throw new BackendError(
          BACKEND_ERRORS.NO_USER,
          BACKEND_MESSAGES.NO_USER,
          undefined,
          "dashboard",
        );
      }
    } else if (params.choice === "credit") {
      const updated = (await updateUser<BetaUser>({
        data: { credit: 50, trial: true },
        userId: user.id,
      })) as BetaUser;
      if (!updated) {
        throw new BackendError(
          BACKEND_ERRORS.NO_USER,
          BACKEND_MESSAGES.NO_USER,
          undefined,
          "dashboard",
        );
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NO_CHOICE,
        BACKEND_MESSAGES.NO_CHOICE,
        undefined,
        "dashboard",
      );
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

const processCustomerCreation = async (
  user: BetaUser,
  params: StripeParams & EmailingParams,
) => {
  try {
    const customer = await createCustomer(user);
    if (customer) {
      const updated = (await updateUser<BetaUser>({
        data: { customerId: customer.id },
        userId: user.id,
      })) as BetaUser;

      if (updated) {
        await processChoice(customer, user, params);
      } else {
        throw new BackendError(
          BACKEND_ERRORS.CUSTOMER_NOT_CREATED,
          BACKEND_MESSAGES.CUSTOMER_NOT_CREATED,
          undefined,
          "dashboard",
        );
      }
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

const handleMiddlewares = (user: BetaUser, trial?: boolean) => {
  try {
    if (user?.pro && !trial) {
      return "pass";
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NOT_AUTHORIZED,
        BACKEND_MESSAGES.NOT_AUTHORIZED,
      );
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

const handleTrialForUser = async (
  user: BetaUser,
  params: StripeParams & EmailingParams,
) => {
  try {
    const auth = handleMiddlewares(user, user?.trial || false);
    if (auth !== "pass") return auth;

    if (user.customerId) {
      const customer = await getCustomer(user.customerId);
      if (customer.deleted || !customer) {
        // si le customer stripe a été supprimé ou n'existe pas
        await processCustomerCreation(user, params);
      } else {
        // si le customer stripe existe
        await processChoice(customer, user, params);
      }
    } else {
      // si le customer stripe n'existe pas
      await processCustomerCreation(user, params);
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

export const redir = (
  type: BACKEND_ERRORS,
  msg: BACKEND_MESSAGES,
  uri?: string,
) => {
  return handleRedirect(
    {
      error: {
        type,
        message: msg,
      },
    },
    uri,
  );
};

export const handleTrialLoggedOut = async (
  params: StripeParams & EmailingParams,
): Promise<Response | NextResponse<unknown>> => {
  try {
    const lead = (await getLead<Lead>({ id: params.leadId })) as Lead;

    if (lead?.token) {
      const verified = await verifyTokenServer(lead.token);

      let user = (await getUser<BetaUser>({
        email: verified.email,
      })) as BetaUser;

      if (!user) {
        const email = verified.email;
        const firstname = lead.name?.split(" ")[0];
        const lastname = lead.name?.split(" ")[1];
        const { uniqueName, extension } = await setUniqueNameAndExtension(
          firstname || "",
          lastname || "",
          1,
        );

        user = (await createUser<BetaUser>({
          data: {
            email,
            firstname,
            lastname,
            fullname: setName({ firstname, lastname }),
            uniqueName,
            extension,
            pro: true,
            phone: lead.phone,
            user: false,
            trial: false,
            linkedinProfileId: lead.linkedinProfileId,
            professionalEmail: isProfessionalEmail(email),
          },
        })) as BetaUser;
      }

      await handleTrialForUser(user, params);

      const result = await setCookieAndTerminate(params.redirect, user);

      return result;
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NOT_AUTHORIZED,
        BACKEND_MESSAGES.NOT_AUTHORIZED,
      );
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

export const handleTrialLoggedIn = async (
  loginPro: string,
  params: StripeParams & EmailingParams,
): Promise<Response | NextResponse<unknown>> => {
  try {
    const verified = await verifyTokenServer(loginPro);

    // si le cookie d'authentification n'est pas corrompu
    const user = (await getUser<BetaUser>({
      email: verified.email,
    })) as BetaUser;

    await handleTrialForUser(user, params);

    const result = await setCookieAndTerminate("dashboard", user);
    return result;
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

export const handleCheckoutLoggedIn = async (
  loginPro: string,
  params: StripeParams & EmailingParams,
) => {
  try {
    const verified = await verifyTokenServer(loginPro);

    const user = (await getUser<BetaUser>({
      userId: verified.userId,
    })) as BetaUser;

    // si l'email contenu dans le cookie est bien celui d'un utilisateur de YouMeet
    const auth = handleMiddlewares(user);
    if (auth !== "pass") return auth;

    const returnTo = formatReturnTo(params.redirect);

    const customerPayload = {} as {
      customer: string;
      customer_email: string;
    };

    if (user.customerId) customerPayload.customer = user.customerId as string;
    if (!user.customerId)
      customerPayload.customer_email = verified.email as string;

    let session;
    if (params.choice === "premium") {
      session = await createSession(
        "subscription",
        returnTo,
        customerPayload,
        user.id || "",
      );
    } else if (params.choice === "credit") {
      session = await createSession(
        "payment",
        returnTo,
        customerPayload,
        user.id || "",
      );
    }
    if (session) {
      return new Response(null, {
        headers: {
          Location: session.url,
        },
        status: 302,
      });
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NO_CHOICE,
        BACKEND_MESSAGES.NO_CHOICE,
      );
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};
