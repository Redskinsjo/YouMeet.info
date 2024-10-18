import { notFound } from "next/navigation";
import BackofficeCvChild from "./backofficeCvChild";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    return <BackofficeCvChild />;
  }
  return notFound();
}
