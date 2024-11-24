"use client";
import ModalWrapper from "./ModalWrapper";
import WebcamComponent from "../dashboard/dashboardComponents/WebcamComponent";
import LoginModalClose from "../login/LoginModalClose";
import { CustomModalProps } from "@youmeet/types/CustomModal";

export default function RecordModal({ type }: CustomModalProps) {
  return (
    <ModalWrapper>
      <>
        <div className="flex-center flex-col gap-[24px] relative">
          <WebcamComponent />
        </div>
        <LoginModalClose type={type} />
      </>
    </ModalWrapper>
  );
}
