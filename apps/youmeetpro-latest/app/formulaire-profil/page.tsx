import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import FormChild from "./formChild";
import useFormDefaultValues from "@youmeet/global-config/useFormDefaultValues";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { FormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { redirect } from "next/navigation";

export default async function Form() {
  const verified = await verifyTokenServer(undefined, "formulaire-profil");

  const defaultValues = (await useFormDefaultValues(
    "organisation",
    (verified as LoginCookiePayload)?.userId
  )) as unknown as FormDefaultValues;
  if (defaultValues)
    return <FormChild defaultValues={defaultValues} category="organisation" />;

  redirect("/se-connecter?redirect=formulaire-profil");
}
