import ModalWrapper from "./ModalWrapper";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";
import ModalClose from "./ModalClose";

const CustomModalContent = dynamic(
  () => import("./modalContents/CustomModalContent")
);

export default function CustomModalComponent({
  type,
  cta,
  title,
  content,
}: CustomModalProps) {
  return (
    <ModalWrapper>
      <div>
        <CustomModalContent
          type={type}
          cta={cta}
          title={title}
          content={content}
        />
        <ModalClose />
      </div>
    </ModalWrapper>
  );
}
