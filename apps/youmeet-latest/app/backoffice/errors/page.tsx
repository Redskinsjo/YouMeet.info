import BackofficeErrorsChild from "./backofficeErrorsChild";
import { getErrors } from "@youmeet/functions/request";
import { Error } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeErrors() {
  const verified = await verifyTokenServer();

  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const errors = (await getErrors(undefined, 0)) as Error[];
    if (errors) return <BackofficeErrorsChild errors={errors} />;
  }
  return notFound();
}
