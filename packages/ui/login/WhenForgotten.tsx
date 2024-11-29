"use client";
import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import { useTranslation } from "react-i18next";
import { useActionState } from "react";
import { onEmailForgotten } from "@youmeet/functions/actions";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import SimpleField from "../formComponents/fields/SimpleField";
import ModalClose from "../modals/ModalClose";
import Logo from "../Logo";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import SubmitBtn from "../SubmitBtn";

export default function WhenForgotten({
  type,
  setIsForgotten,
}: CustomModalProps) {
  const [state, handle] = useActionState(onEmailForgotten, { data: false });
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const keydownListener = useCallback(
    (e: any) => {
      if (e.key === "Enter" && formRef.current) {
        e.preventDefault();
        (formRef.current as HTMLFormElement).requestSubmit();
      }
    },
    [formRef.current]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);
  }, [keydownListener]);

  useEffect(() => {
    if (state && isPayloadError(state))
      setStatus(state.message || "Une erreur est survenue");
    else if ((state as withData<boolean>).data)
      setStatus(t("forgotten-password-email-sent"));
  }, [(state as PayloadBackendError).error, (state as withData<boolean>).data]);

  return (
    <form
      ref={formRef}
      name="forgotten"
      action={handle}
      onClick={(e) => e.stopPropagation()}
    >
      <Logo png />
      <h1 className="m-0 p-0 titles text-center dark:text-white">
        {t("reset-password")}
      </h1>

      <div className="flex flex-col gap-[12px] w-full">
        <SimpleField name="email" required label={t("email")} type="email" />
      </div>
      {!!status && (
        <div
          className={
            (state as PayloadBackendError)?.error
              ? "legend text-red500 dark:text-red200"
              : "legend text-green500 dark:text-green200"
          }
        >
          {status}
        </div>
      )}
      <div className="w-full flex-center gap-[24px] flex-col">
        <SubmitBtn text={t("validate")} />
        <div
          className={
            xs || sm
              ? "auth-to-signin group flex-[2] dark:text-white"
              : "auth-to-signin group flex-1 dark:text-white"
          }
          onClick={(e) => {
            e.stopPropagation();
            if (setIsForgotten) setIsForgotten(false);
          }}
        >
          <span className="legend text-center">{t("already-signed")}</span>
          <span className="group-hover:underline legend text-center">
            {t("login")}
          </span>
        </div>

        <div className="flex-1"></div>
      </div>
      {type !== "loginPage" && <ModalClose />}
    </form>
  );
}
