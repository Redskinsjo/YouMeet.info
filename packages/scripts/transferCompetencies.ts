import prisma from "@youmeet/prisma-config/prisma";
import mongoose from "mongoose";

const connection1 = mongoose.createConnection(`${process.env.MONGODB_URI}`);
const connection2 = mongoose.createConnection(`${process.env.MONGODB_URI_DEV}`);

(async () => {
  const competencies1 = await (
    await connection1.collection("competencies").find()
  ).toArray();
  console.log(competencies1.length);

  for (let i = 0; i < competencies1.length; i++) {
    const competency = competencies1[i];
    await connection2.collection("competencies").insertOne(competency);
  }

  const competencies2 = await (
    await connection2.collection("competencies").find()
  ).toArray();
  console.log(competencies2.length);
  process.exit(0);
})();
