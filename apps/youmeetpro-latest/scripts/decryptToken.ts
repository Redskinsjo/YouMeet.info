import dotenv from "dotenv";
import { verif } from "@youmeet/utils/jwt";
import process from "process";
dotenv.config();

(async () => {
  let token;
  if (process.argv[2].includes("=")) token = process.argv[2].split("=")[1];
  else token = process.argv[2];

  const decrypt = await verif(token);

  if (decrypt) console.log(decrypt);
  else console.log("Token invalid");
  process.exit();
})();
