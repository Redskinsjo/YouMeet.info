import BackofficeErrorsChild from "./backofficeErrorsChild";
import { getErrors } from "@youmeet/functions/request";
import { Error } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeErrors() {
  const verified = await verifyTokenServer();

  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const errors = (await getErrors(undefined, 0)) as Error[];
    if (errors) return <BackofficeErrorsChild errors={errors} />;
  }
  return <Custom404 />;
}
