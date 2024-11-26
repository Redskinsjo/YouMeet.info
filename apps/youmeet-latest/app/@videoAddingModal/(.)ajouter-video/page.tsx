import CustomModal from "@youmeet/ui/CustomModal";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function VideoAddingModal() {
  const verified = await verifyTokenServer();
  if (!verified) return notFound();
  return <CustomModal type="videoAdding" />;
}
