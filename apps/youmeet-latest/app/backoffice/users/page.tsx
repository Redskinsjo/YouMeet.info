import BackofficeUsersChild from "./backofficeUsersChild";
import { getUsers } from "@youmeet/functions/request";
import { BetaUser } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const users = (await getUsers(
      { data: { user: true, pro: true } },
      0
    )) as BetaUser[];
    if (users) return <BackofficeUsersChild users={users} />;
  }
  return <Custom404 />;
}
