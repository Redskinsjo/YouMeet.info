"use client";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";

export default function AtsChild() {
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  return <></>;
}
