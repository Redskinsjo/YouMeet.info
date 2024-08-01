import { s } from "@youmeet/utils/jwt";
import dotenv from "dotenv";
import BetaUser from "@youmeet/models/betaUsers";
dotenv.config();

(async () => {
  // PRENDRE SEULEMENT L'EMAIL DU CANDIDAT
  // prend en compte l'email et l'experienceId donnés en input
  // les deux arguments sont requis !!!
  // soit email=/email/, expId=/experienceId/
  // soit yarn run gen-pri-cookie /email/ /experienceId/

  let email;
  if (process.argv[2].includes("=")) email = process.argv[2].split("=")[1];
  else email = process.argv[2];

  const user = await BetaUser.findOne({
    email,
  });

  if (user) {
    const beforeCookie = {
      email: email,
      customerId: user?.customerId ? user.customerId : "",
      userId: user?._id?.toString() || "",
      pro: user?.pro ? true : false,
      user: user?.user ? true : false,
      companyId: user?.companyId?.toString() || "",
      scrapped: (user?.scrapped as boolean) ? true : false,
    };

    const signed = await s(beforeCookie);

    console.log("tu peux utiliser ce cookie => ", signed);
  } else {
    console.log("pas de user");
  }
})();
