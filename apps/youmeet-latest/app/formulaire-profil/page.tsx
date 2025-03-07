import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import useFormDefaultValues from "@youmeet/global-config/useFormDefaultValues";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { redirect } from "next/navigation";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";

const FormChild = dynamic(
  () => import("@youmeet/ui/formComponents/steps/formChild")
);

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
