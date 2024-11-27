"use client";

import ModalWrapper from "./ModalWrapper";
import ModalClose from "./ModalClose";
import dynamic from "next/dynamic";
import { CustomModalProps } from "@youmeet/types/CustomModal";

const UploadText = dynamic(() => import("./UploadModal/UploadText"), {
  ssr: false,
});
const Logo = dynamic(() => import("@youmeet/ui/LogoChild"), { ssr: false });

export default function UploadModalContent(props: CustomModalProps) {
  console.log("UploadModalContent");
  return (
    <ModalWrapper>
      <>
        <div className="w-full flex-center flex-col gap-[24px]">
          <Logo gif png />

          <UploadText />
        </div>
        <ModalClose />
      </>
    </ModalWrapper>
  );
}
