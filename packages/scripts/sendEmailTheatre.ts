import { getUsers } from "@youmeet/functions/request";
import * as SendinBlue from "@getbrevo/brevo";
import dotenv from "dotenv";
import { BetaUser } from "@youmeet/gql/generated";
import { setName } from "@youmeet/utils/basics/setName";
dotenv.config();
export const apiInstance = new SendinBlue.TransactionalEmailsApi();

apiInstance.setApiKey(
  SendinBlue.TransactionalEmailsApiApiKeys.apiKey,
  `${process.env.SENDINBLUE_APIKEY}`
);
(async () => {
  const users = (await getUsers()) as BetaUser[];
  console.log(users.length);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (!user) continue;

    try {
      const res = await apiInstance.sendTransacEmail({
        to: [
          {
            email: user?.email as string,
            name: setName(user) as string,
          },
        ],
        replyTo: {
          email: "contact@youmeet.info",
        },
        params: { name: setName(user) },
        templateId: 42 as number,
      });

      console.log(res.response.statusCode, ":", i);
    } catch (err) {
      console.log(err.message, ":", i);
    }
  }
  process.exit(0);
})();
