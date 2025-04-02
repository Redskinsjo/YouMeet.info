import { EMAIL_PERSO } from "@youmeet/functions/imports";
import BackofficeUsersChild from "./backofficeUsersChild";
import { getUsers } from "@youmeet/functions/request";
import { BetaUser } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (verified && verified.email.toLowerCase() === EMAIL_PERSO) {
    const users = (await getUsers(
      { data: { user: true, pro: true } },
      0
    )) as BetaUser[];

    if (users) return <BackofficeUsersChild users={users} />;
  }
  return notFound();
}
