"use client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import CustomModal from "@youmeet/ui/CustomModal";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { useSelector } from "react-redux";

export default function VideoAddingModal() {
  const verified = verifyTokenServer();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const error = global.error;
  const upload = global.upload;
  if (!verified) return null;

  const customModal = modal.display || error || upload;
  return !!customModal ? <CustomModal type={customModal} /> : null;
}
