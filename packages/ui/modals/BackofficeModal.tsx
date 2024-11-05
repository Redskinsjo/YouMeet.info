"use client";

import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { ModalState } from "@youmeet/global-config/features/modal";
import {
  BackofficeModalData,
  BackofficeModalDataType,
} from "@youmeet/types/modal";
import { useMemo } from "react";
import BackofficeModalContent from "../backoffice/backofficeComponents/BackofficeModalContent";
import { CustomModalProps } from "@youmeet/types/CustomModal";

export default function BackofficeModalComponent(props: CustomModalProps) {
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
