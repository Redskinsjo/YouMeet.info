"use client";
import { Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LoginComponentTopPart from "./LoginComponentTopPart";
import { useSelector } from "react-redux";
import { useActionState } from "react";
import { onLogin } from "@youmeet/functions/actions";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import SimpleField from "../formComponents/fields/SimpleField";
import ModalClose from "../modals/ModalClose";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { RootState } from "@youmeet/global-config/store";
import SubmitBtn from "../SubmitBtn";
import { GlobalState } from "@youmeet/global-config/features/global";

export default function WhenLogin({
  type,
  setIsForgotten,
  setIsSubscribing,
}: CustomModalProps) {
  const [email, setEmail] = useState("");
  const [state, handle] = useActionState<
    withData<string | null> | PayloadBackendError,
    FormData
  >(onLogin, { data: null });
  const redirect = useSelector(
    (state: RootState) => (state.global as GlobalState).redirect
  );
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  router.prefetch(`/dashboard`);

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
    if (redirect) {
      const matched2 = /(?<=email=)[^&]+/gm.test(decodeURIComponent(redirect));
      const result2 = decodeURIComponent(redirect).match(/(?<=email=)[^&]+/gm);

      if (matched2 && result2) setEmail(result2[0]);
    }
  }, [redirect]);

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);
  }, [keydownListener]);

  useEffect(() => {
    if (state && isPayloadError(state)) setStatus(state.message);
  }, [
    state,
    (state as PayloadBackendError).error,
    (state as withData<string>).data,
  ]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Suspense>
        <LoginComponentTopPart />
      </Suspense>
      <form
        ref={formRef}
        action={handle}
        name="classic-signin"
        className="w-full flex flex-col gap-[36px] xs:gap-[24px] sm:gap-[24px] md:gap-[24px]"
      >
        <div className="flex flex-col gap-[12px] xs:gap-[6px] sm:gap-[6px] md:gap-[6px] w-full">
          <SimpleField
            name="email"
            value={email}
            required
            type="email"
            label={t("email")}
          />
          <SimpleField name="password" type="password" label={t("password")} />
          <SimpleField value={redirect} name="redirect" type="hidden" />
        </div>
        {!!status && (
          <span
            className={
              (state as PayloadBackendError).error
                ? "legend text-red500 dark:text-red200"
                : "legend text-green500 dark:text-green200"
            }
          >
            {status}
          </span>
        )}
        <div className="w-full flex-center gap-[24px] flex-col">
          <SubmitBtn text={t("login")} />

          <div className="flex-bet w-full">
            <div
              className="flex-1 hover:text-blueGrey500 dark:text-blueGrey200 cursor-pointer text-[14px]"
              onClick={() => {
                if (setIsForgotten) setIsForgotten(true);
              }}
            >
              {t("forgotten-password")}
            </div>
            {process.env.APP === "candidate" && (
              <div
                className="auth-to-signin group flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  if (setIsSubscribing) setIsSubscribing(true);
                }}
              >
                <Button className="buttonMui">{t("signup")}</Button>
              </div>
            )}
          </div>
        </div>
      </form>
      {type !== "loginPage" && <ModalClose />}
    </div>
  );
}
