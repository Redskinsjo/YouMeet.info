import CryptoJS from "crypto-js";
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
    email: email.toLowerCase(),
  });

  if (user?.auth && user.auth.internal) {
    const decryption = CryptoJS.AES.decrypt(
      user?.auth.internal?.hash,
      `${process.env.JWT_SECRET}`
    );
    const decryptedPassword = decryption?.toString(CryptoJS.enc.Utf8);

    console.log("Le mot de passe est => ", decryptedPassword);
  } else {
    console.log("pas de user");
  }
})();
