import CustomModal from "@youmeet/ui/CustomModal";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";

export default async function VideoAddingModal() {
  const verified = await verifyTokenServer();
  console.log(verified, "verified");
  if (!verified) return null;
  return <CustomModal type="videoAdding" />;
}
