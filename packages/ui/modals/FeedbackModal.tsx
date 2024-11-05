"use client";

import { RootState } from "@youmeet/global-config/store";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "@youmeet/global-config/features/user";
import ModalWrapper from "./ModalWrapper";
import { useTranslation } from "react-i18next";
import { resetModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { CustomModalProps, trads } from "@youmeet/types/CustomModal";
import { useEffect, useState } from "react";
import { ModalState } from "@youmeet/global-config/features/modal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setError } from "@youmeet/global-config/features/global";
import { onAddFeedback } from "@youmeet/functions/actions";
import { Button } from "@mui/material";
import { withData } from "@youmeet/types/api/backend";
import { useActionState, useRef } from "react";
import dynamic from "next/dynamic";
import SimpleField from "../formulaire-profil/formComponents/fields/SimpleField";
import { modals } from "./modals";

const BoldText = dynamic(() => import("@youmeet/ui/TextChild"), { ssr: false });

export default function FeedBackModal({ type }: CustomModalProps) {
  const [state, formHandler] = useActionState(onAddFeedback, {
    data: false,
  });
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const [status, setStatus] = useState((state as withData<boolean>)?.data);
  const formRef = useRef<HTMLFormElement | null>(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state && isPayloadError(state)) dispatch(setError("not-completed"));
    else if ((state as withData<boolean>).data) {
      setStatus((state as withData<boolean>).data);
      (formRef.current as HTMLFormElement)?.reset();
      setTimeout(() => {
        setStatus(false);
        dispatch(resetModal("ok") as UnknownAction);
      }, 5000);
    }
  }, [state]);

<<<<<<< HEAD
  const modals: any = undefined;

=======
>>>>>>> 05028fecbea842ad720d3e46e568f0105ae8ac9d
  return (
    !!modal.user && (
      <ModalWrapper>
        <div className="w-full flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px] p-[12px]">
          <h3 className="text-purple900 sentences">
<<<<<<< HEAD
            {modals && modals[type] && modals[type]?.title && (
              <BoldText
                text={`${t((modals[type]?.title as trads)[language])}`}
=======
            {modals && modals[type] && modals[type].title && (
              <BoldText
                text={`${t((modals[type].title as trads)[language])}`}
>>>>>>> 05028fecbea842ad720d3e46e568f0105ae8ac9d
              />
            )}
          </h3>
          <form
            ref={formRef}
            action={formHandler}
            className="xs:text-[22px] sm:text-[22px] md:text-[22px] text-blueGrey700 text-[19px] text-center flex-center flex-col gap-[12px]"
          >
<<<<<<< HEAD
            {modals && modals[type] && modals[type]?.content && (
              <BoldText
                text={`${t((modals[type]?.content as trads)[language])}`}
=======
            {modals && modals[type] && modals[type].content && (
              <BoldText
                text={`${t((modals[type].content as trads)[language])}`}
>>>>>>> 05028fecbea842ad720d3e46e568f0105ae8ac9d
              />
            )}
            <SimpleField
              name="feedback"
              type="text"
              label="Feedback"
              multiline={true}
              rows={3}
              required
            />
            <SimpleField
              name="userId"
              type="hidden"
              value={modal.user.id}
              required
            />
            <SimpleField
              name="authorId"
              type="hidden"
              value={user.id}
              required
            />
            <Button type="submit">{t("validate")}</Button>
          </form>
          {status && (
            <div className="text-green500 text-[16px]">
              Votre commentaire a bien été fait
            </div>
          )}
        </div>
      </ModalWrapper>
    )
  );
}
