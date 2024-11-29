import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import useFormDefaultValues from "@youmeet/global-config/useFormDefaultValues";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { OfferDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { redirect } from "next/navigation";
import FormChild from "./offerChild";

export default async function Form() {
  const verified = await verifyTokenServer(undefined, "creer-offre");
  if (!verified) redirect("/se-connecter?redirect=creer-offre");
  const defaultValues = (await useFormDefaultValues(
    "offer",
    (verified as LoginCookiePayload)?.userId
  )) as OfferDefaultValues;
  if (defaultValues)
    return <FormChild defaultValues={defaultValues} category="offer" />;

  redirect("/se-connecter?redirect=creer-offre");
}
