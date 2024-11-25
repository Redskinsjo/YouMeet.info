import CustomModal from "@youmeet/ui/CustomModal";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";

export default function VideoAddingModal() {
  const verified = verifyTokenServer();
  if (!verified) return null;
  return <CustomModal type="videoAdding" />;
}
