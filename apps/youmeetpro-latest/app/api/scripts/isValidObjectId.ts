import dotenv from "dotenv";
import process from "process";
import { isValidObjectId } from "mongoose";
dotenv.config();

(async () => {
  let id;
  if (process.argv[2].includes("=")) id = process.argv[2].split("=")[1];
  else id = process.argv[2];

  const isValid = isValidObjectId(id);

  if (isValid) console.log("Valid ObjectId");
  else console.log("not a valid ObjectId");
  process.exit();
})();
