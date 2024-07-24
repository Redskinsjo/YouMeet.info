import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import OfferChild from "./offerChild";
import useFormDefaultValues from "@youmeet/global-config/useFormDefaultValues";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { OfferDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { redirect } from "next/navigation";

export default async function Form() {
  const verified = await verifyTokenServer(undefined, "creer-offre");
  if (!verified) redirect("/se-connecter?redirect=creer-offre");
  const defaultValues = (await useFormDefaultValues(
    "offer",
    (verified as LoginCookiePayload)?.userId
  )) as unknown as OfferDefaultValues;
  if (defaultValues)
    return <OfferChild defaultValues={defaultValues} category="offer" />;

  redirect("/se-connecter?redirect=creer-offre");
}
