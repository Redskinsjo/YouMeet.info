"use client";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import CustomModal from "@youmeet/ui/CustomModal";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { useSelector } from "react-redux";

export default function VideoAddingModal() {
  const verified = verifyTokenServer();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  if (!verified) return null;
  return !!modal.display ? <CustomModal type={modal.display} /> : null;
}
