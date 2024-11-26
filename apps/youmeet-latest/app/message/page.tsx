import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";
import MessageModalChild from "./messageModalChild";

export default async function VideoAddingModal() {
  const verified = await verifyTokenServer();
  if (verified) return <MessageModalChild />;
  return notFound();
}
