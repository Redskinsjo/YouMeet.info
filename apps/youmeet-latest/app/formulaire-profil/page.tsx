import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import useFormDefaultValues from "@youmeet/global-config/useFormDefaultValues";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import FormChild from "./formChild";
import { redirect } from "next/navigation";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";

export default async function Form() {
  const verified = await verifyTokenServer();
  if (!verified) redirect("/se-connecter?redirect=formulaire-profil");
  const defaultValues = (await useFormDefaultValues(
    "profile",
    (verified as LoginCookiePayload)?.userId
  )) as ProfileFormDefaultValues;

  if (defaultValues) return <FormChild defaultValues={defaultValues} />;
  redirect("/se-connecter?redirect=formulaire-profil");
}
