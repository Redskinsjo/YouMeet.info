import BackofficeRemarksChild from "./backofficeRemarksChild";
import { getUserRemarks } from "@youmeet/functions/request";
import { UserRemark } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeRemarks() {
  const verified = await verifyTokenServer();

  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const remarks = (await getUserRemarks<UserRemark[]>()) as UserRemark[];
    if (remarks) return <BackofficeRemarksChild remarks={remarks} />;
  }
  return <Custom404 />;
}
