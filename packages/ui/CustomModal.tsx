"use client";
import { createElement, useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { useRouter } from "next/navigation";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import LoginModalContent from "./login/LoginModalContent";
import { ModalState } from "@youmeet/global-config/features/modal";
import dynamic from "next/dynamic";

const RecordModal = dynamic(() => import("./modals/RecordModal"), {
  ssr: false,
});
const FulfillModal = dynamic(() => import("./modals/FulfillModal"), {
  ssr: false,
});
const BackofficeModal = dynamic(() => import("./modals/BackofficeModal"), {
  ssr: false,
});
const NotificationsModal = dynamic(
  () => import("./modals/NotificationsModal"),
  {
    ssr: false,
  }
);
const FeedBackModal = dynamic(() => import("./modals/FeedbackModal"), {
  ssr: false,
});
//
const VideoAddingModal = dynamic(() => import("./modals/VideoAddingModal"), {
  ssr: false,
});
const UploadModal = dynamic(() => import("./modals/UploadModal"), {
  ssr: false,
});
const CustomModalContent = dynamic(
  () => import("./modals/CustomModalContent"),
  {
    ssr: false,
  }
);

export default function CustomModal({
  type,
  setDisplayModal,
  children,
}: CustomModalProps) {
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const router = useRouter();

  const uploadDelete =
    type === "upload" || type === "upload-50" || type === "delete";

  const modalContent = useMemo(
    () =>
      type ? (
        createElement(
          type === "fulfill"
            ? FulfillModal
            : type === "record"
            ? RecordModal
            : type === "backoffice"
            ? BackofficeModal
            : type === "notifications"
            ? NotificationsModal
            : type === "feedback"
            ? FeedBackModal
            : type === "videoAdding"
            ? VideoAddingModal
            : uploadDelete
            ? UploadModal
            : type === "login"
            ? LoginModalContent
            : CustomModalContent,
          {
            setDisplayModal,
            type,
            content: modal.message,
          }
        )
      ) : (
        <></>
      ),
    [type]
  );

  const aboveError =
    type === "upload" ||
    type === "upload-50" ||
    type === "delete" ||
    type === "backofficeConfirm" ||
    type === "fileTooLarge" ||
    type === "creditTooLow" ||
    type === "requestNotCompleted" ||
    type === "not-completed" ||
    type === "request-feedback";

  return (
    <div
      className="absolute afterHeader w-full fadeIn"
      style={{
        zIndex: aboveError ? 1101 : 1100,
        background: "rgba(0,0,0,0.5)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (type === "login" || type === "record") router.back();
        if (setDisplayModal) {
          setDisplayModal(null);
        } else {
          router.back();
        }
      }}
    >
      <div className="h-full flex-center fixed w-full">
        <Suspense>{children ?? modalContent}</Suspense>
      </div>
    </div>
  );
}
