"use client";
import BackofficeModalContent from "../backoffice/backofficeComponents/BackofficeModalContent";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import {
  BackofficeModalData,
  BackofficeModalDataType,
} from "@youmeet/types/modal";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function BackofficeModalComponent({ type }: CustomModalProps) {
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const content = useMemo(() => {
    let data:
      | {
          data: BackofficeModalData;
          type: BackofficeModalDataType;
        }
      | undefined;
    if (modal) {
      if (modal.queue) {
        data = {
          type: "queue",
          data: modal.queue as Partial<BackofficeModalData>,
        };
      }
      if (modal.lead) {
        data = {
          type: "lead",
          data: modal.lead as Partial<BackofficeModalData>,
        };
      }
      if (modal.thread) {
        data = {
          type: "thread",
          data: modal.thread as Partial<BackofficeModalData>,
        };
      }
      if (modal.job) {
        data = {
          type: "job",
          data: modal.job as Partial<BackofficeModalData>,
        };
      }
      if (modal.company) {
        data = {
          type: "company",
          data: modal.company as Partial<BackofficeModalData>,
        };
      }
      if (modal.user) {
        data = {
          type: "user",
          data: modal.user as Partial<BackofficeModalData>,
        };
      }
      if (data) {
        return <BackofficeModalContent data={data} />;
      }
    }
  }, [modal]);

  return content;
}
