"use client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import CustomModal from "@youmeet/ui/CustomModal";
import { useEffect, useState } from "react";
import { CustomModalType } from "@youmeet/types/CustomModal";

export default function MessageModalChild() {
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const error = global.error;
  const upload = global.upload;
  const [customModal, setCustomModal] = useState<CustomModalType | null>(null);

  useEffect(() => {
    const customModal = modal.display || error || upload;
    setCustomModal(customModal);
  }, [error, upload, modal.display]);

  console.log(customModal, "customModal");

  return !!customModal ? (
    <div className="dark:darkBg flex flex-col h-screen">
      <CustomModal type={customModal} />
    </div>
  ) : null;
}
