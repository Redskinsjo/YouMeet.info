import { getUsers } from "@youmeet/functions/request";
import { BetaUser } from "@youmeet/gql/generated";
import * as SendinBlue from "@getbrevo/brevo";
import dotenv from "dotenv";
import { setName } from "@youmeet/utils/basics/setName";
dotenv.config();
export const apiInstance = new SendinBlue.TransactionalEmailsApi();

apiInstance.setApiKey(
  SendinBlue.TransactionalEmailsApiApiKeys.apiKey,
  `${process.env.SENDINBLUE_APIKEY}`
);

(async () => {
  const users = (await getUsers<BetaUser[]>()) as BetaUser[];

  console.log(
    users.length,
    "users to send email to",
    users.map((user) => user.createdAt)
  );
  const newUsers = users.filter(
    (user) =>
      new Date(user.createdAt).getTime() + 1000 * 3600 * 24 * 3 >
      new Date().getTime()
  );

  try {
    console.log(newUsers.length, "new users to send email to");
    const promises = await Promise.all(
      newUsers.map((user) => {
        const promise = new Promise((resolve) => {
          resolve(
            apiInstance.sendTransacEmail({
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
              templateId: 43 as number,
            })
          );
        });
        return promise;
      })
    );
    console.log(promises.length, "promises length");
    promises.forEach((res: any, i) => {
      console.log(res.response.statusCode, ":", i);
    });
  } catch (error) {
    console.log("err:", error.message);
  }

  process.exit(0);
})();
