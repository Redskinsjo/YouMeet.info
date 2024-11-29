import ModalWrapper from "./ModalWrapper";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";
import ModalClose from "./ModalClose";

const VideoAddingContent = dynamic(
  () => import("./modalContents/VideoAddingContent")
);

export default function VideoAddingModal({
  type,
  cta,
  title,
  content,
}: CustomModalProps) {
  return (
    <ModalWrapper>
      <div>
        <VideoAddingContent
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
