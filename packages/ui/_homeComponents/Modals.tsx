import { GlobalState, setError } from "@youmeet/global-config/features/global";
import { ModalState, resetModal } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

const CustomModal = dynamic(() => import("../CustomModal"), { ssr: false });

export default function Modals() {
  const error = useSelector(
    (state: RootState) => (state.global as GlobalState).error
  );
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const dispatch = useDispatch();
  return (
    <>
      {error && (
        <CustomModal
          type={error}
          setDisplayModal={(payload) => dispatch(setError(payload))}
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
