import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { UnknownAction } from "@reduxjs/toolkit";
import { HiPencil } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import TooltipedAsset from "../TooltipedAsset";
import dynamic from "next/dynamic";
import SimpleField from "../formComponents/fields/SimpleField";
import { onRemark } from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { GlobalState, setError } from "@youmeet/global-config/features/global";
import {
  ModalState,
  resetModal,
  setModal,
} from "@youmeet/global-config/features/modal";

const DetailComponent = dynamic(() => import("@youmeet/ui/DetailComponent"));

export default function UserRemarkComponent() {
  const [isValidated, setIsValidated] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user as UserState);
  const formRef = useRef(null);
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const customOnRemark = async (formData: FormData) => {
    dispatch(setModal({ display: "upload" }) as UnknownAction);
    const result = await onRemark(formData);
    if (result && isPayloadError(result)) {
      dispatch(setError("requestNotCompleted") as UnknownAction);
    } else {
      console.log(modal, "modal1");
      dispatch(resetModal(null) as UnknownAction);
      dispatch(
        setModal({
          display: "backofficeConfirm",
        }) as UnknownAction
      );
    }
  };

  return (
    <div className="w-full">
      {!isValidated ? (
        <form
          ref={formRef}
          className="flex-bet gap-[12px] w-full"
          action={customOnRemark}
        >
          <DetailComponent
            conversation
            type="modal"
            label="what-remarks"
            value={
              <SimpleField
                multiline
                rows={6}
                type="text"
                name="content"
                label={t("remarks")}
                placeholder={t("what-remarks")}
              />
            }
          />

          <SimpleField type="hidden" name="userId" value={user.id} />

          <div className="flex flex-col gap-[6px]">
            <TooltipedAsset asset={`${t("cancel")}`} placement="right">
              <div className="flex-center">
                <MdOutlineCancel
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                  onClick={() => setIsValidated(true)}
                />
              </div>
            </TooltipedAsset>
            <TooltipedAsset asset={`${t("validate")}`} placement="right">
              <div className="flex-center">
                <IoIosCheckmarkCircle
                  style={{ borderRadius: "100%" }}
                  onClick={() => {
                    if (formRef.current)
                      (formRef.current as HTMLFormElement)?.requestSubmit();
                  }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                />
              </div>
            </TooltipedAsset>
          </div>
        </form>
      ) : (
        <div className="w-full flex-center gap-[24px]">
          <h3 className="font-light subItem my-0 dark:text-grey300">
            {t("what-remarks")}
          </h3>
          <div className="flex-center gap-[12px]">
            <span>-</span>
            {isValidated ? (
              <div>
                <HiPencil
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 p-[4px] text-[18px] cursor-pointer"
                  onClick={() => setIsValidated(false)}
                />
              </div>
            ) : undefined}
          </div>
        </div>
      )}
    </div>
  );
}
