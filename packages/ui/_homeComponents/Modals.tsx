import {
  GlobalState,
  setError,
  setUpload,
} from "@youmeet/global-config/features/global";
import { ModalState, resetModal } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

const CustomModal = dynamic(() => import("../CustomModal"), { ssr: false });

export default function Modals() {
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const error = global.error;
  const upload = global.upload;
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const dispatch = useDispatch();
  return (
    <>
      {(error || upload) && (
        <CustomModal
          type={error || (upload as "upload")}
          setDisplayModal={(payload) => {
            dispatch(setError(payload));
            dispatch(setUpload(payload));
          }}
        />
      )}
      {modal.display && modal.display !== "home" && (
        <CustomModal
          // à revoir pour simplifier les conditions de modal
          type={modal.display as any}
          setDisplayModal={(payload) =>
            dispatch(resetModal(payload) as UnknownAction)
          }
        />
      )}
    </>
  );
}
