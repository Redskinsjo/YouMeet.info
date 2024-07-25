import dotenv from "dotenv";
import BetaUser from "@youmeet/models/betaUsers";
dotenv.config();

(async () => {
  // PRENDRE SEULEMENT L'EMAIL DU CANDIDAT
  // prend en compte l'email et l'experienceId donnés en input
  // les deux arguments sont requis !!!
  // soit email=/email/, expId=/experienceId/
  // soit yarn run gen-pri-cookie /email/ /experienceId/

  await BetaUser.deleteMany({ scrapped: true });

  process.exit();
})();
