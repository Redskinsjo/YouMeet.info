"use client";
import ModalWrapper from "./ModalWrapper";
import WebcamComponent from "../dashboardComponents/WebcamComponent";
import ModalClose from "./ModalClose";
import { CustomModalProps } from "@youmeet/types/CustomModal";

export default function RecordModal({ type }: CustomModalProps) {
  return (
    <ModalWrapper>
      <>
        <div className="flex-center flex-col gap-[24px] relative">
          <WebcamComponent />
        </div>
        <ModalClose />
      </>
    </ModalWrapper>
  );
}
