"use client";
import { Button, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useActionState } from "react";
import { onSigninUp } from "@youmeet/functions/actions";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import SimpleField from "../formComponents/fields/SimpleField";
import ModalClose from "../modals/ModalClose";
import PhoneField from "../formComponents/fields/PhoneField";
import Logo from "../Logo";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { RootState } from "@youmeet/global-config/store";
import SubmitBtn from "../SubmitBtn";
import ReadCGU from "../ReadCGU";
import { GlobalState } from "@youmeet/global-config/features/global";

export default function WhenSubscribing({
  type,
  setIsSubscribing,
}: CustomModalProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [state, handle] = useActionState(onSigninUp, { data: "" });
  const redirect = useSelector(
    (state: RootState) => (state.global as GlobalState).redirect
  );
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
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
    if (state && isPayloadError(state))
      setStatus(state.message || "Une erreur est survenue");
    else if ((state as withData<string>).data) {
      setStatus("La connexion a été établie");
      router.push(`/${(state as withData<string>).data}`);
    }
  }, [
    state,
    (state as withData<string>).data,
    (state as PayloadBackendError).error,
  ]);

  return (
    <form
      ref={formRef}
      action={handle}
      name="subscribing"
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[12px] xs:gap-[6px] sm:gap-[6px] w-full"
    >
      <div className="flex-center flex-col gap-[12px]">
        <Logo png />

        <h1 className="m-0 p-0 titles text-center dark:text-white">
          {t("signup")}
        </h1>
      </div>
      <div className="gap-[12px] xs:gap-[6px] sm:gap-[6px] md:gap-[6px] grid grid-cols-2 w-full">
        <SimpleField
          required
          value={firstname}
          name="firstname"
          label={t("firstname")}
          type="text"
        />
        <SimpleField
          required
          value={lastname}
          name="lastname"
          label={t("lastname")}
          type="text"
        />
        <div className="col-span-2">
          <SimpleField
            required
            value={email}
            name="email"
            label={t("email")}
            type="email"
          />
        </div>
        <div className="col-span-2">
          <PhoneField name="phone" label={t("phone")} type="number" />
        </div>
        <div className="col-span-2">
          <SimpleField
            required
            name="password"
            label={t("password")}
            type="password"
          />
        </div>

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

      <ReadCGU />
      <div className="w-full flex-center gap-[12px] flex-col">
        <div onClick={() => setStatus("")}>
          <SubmitBtn text={t("signup")} />
        </div>
        <div
          className={
            xs || sm
              ? "auth-to-signin text-deepPurple900 dark:text-deepPurple100 group flex-[2]"
              : "auth-to-signin text-deepPurple900 dark:text-deepPurple100 group flex-1"
          }
          onClick={(e) => {
            e.stopPropagation();
            if (setIsSubscribing) setIsSubscribing(false);
          }}
        >
          <span className="legend text-center">{t("already-signed")}</span>
          <Button className="buttonMui">{t("login")}</Button>
        </div>

        <div className={xs || sm ? "flex-[2]" : "flex-1"}></div>
      </div>
      {type !== "loginPage" && <ModalClose />}
    </form>
  );
}
