"use client";
import { Button, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import {
  CustomModalProps,
  SignupCookiePayload,
} from "@youmeet/types/CustomModal";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoginComponentTopPart from "./LoginComponentTopPart";
import { useSelector } from "react-redux";
import { useFormState } from "react-dom";
import {
  onEmailForgotten,
  onLogin,
  onSigninUp,
} from "@youmeet/functions/actions";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import SimpleField from "./formulaire-profil/formComponents/fields/SimpleField";
import LoginModalClose from "./LoginModalClose";
import PhoneField from "./formulaire-profil/formComponents/fields/PhoneField";
import Logo from "./Logo";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import SubmitBtn from "./SubmitBtn";
import ReadCGU from "./ReadCGU";

const WhenSubscribin = ({ type, setIsSubscribing }: CustomModalProps) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [state, handle] = useFormState(onSigninUp, { data: "" });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchRedirect = encodeURIComponent(searchParams.get("redirect") || "");
  const redirect = searchRedirect
    ? searchRedirect
    : pathname === "/" || pathname === "/se-connecter"
    ? "dashboard"
    : pathname;
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

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
  }, [(state as withData<string>).data, (state as PayloadBackendError).error]);

  useEffect(() => {
    router.prefetch(`/dashboard`);
  }, []);

  return (
    <form
      ref={formRef}
      action={handle}
      name="subscribing"
      className="auth-form-content dark:mediumDarkBg"
      onClick={(e) => e.stopPropagation()}
    >
      <Logo png />

      <h1 className="m-0 p-0 titles text-center dark:text-white">
        {t("signin")}
      </h1>

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
        <SubmitBtn text={t("signin")} />
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
          <span className="group-hover:underline legend text-center">
            {t("login")}
          </span>
        </div>

        <div className={xs || sm ? "flex-[2]" : "flex-1"}></div>
      </div>
      {type !== "loginPage" && <LoginModalClose type={type} />}
    </form>
  );
};

const WhenLogin = ({
  type,
  setIsForgotten,
  setIsSubscribing,
}: CustomModalProps) => {
  const [email, setEmail] = useState("");
  const [state, handle] = useFormState<
    withData<string | null> | PayloadBackendError,
    FormData
  >(onLogin, { data: null });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchRedirect = encodeURIComponent(searchParams.get("redirect") || "");
  const redirect = searchRedirect
    ? searchRedirect
    : pathname === "/" || pathname === "/se-connecter"
    ? "dashboard"
    : pathname;
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

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
  }, [(state as PayloadBackendError).error, (state as withData<string>).data]);

  useEffect(() => {
    router.prefetch(`/dashboard`);
  }, []);

  return (
    <div
      className="auth-form-content dark:mediumDarkBg gap-0"
      onClick={(e) => e.stopPropagation()}
    >
      <Suspense>
        <LoginComponentTopPart />
      </Suspense>
      <form
        ref={formRef}
        action={handle}
        name="classic-signin"
        className="auth-form-content justify-start flex-1 dark:mediumDarkBg"
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
                <Button className="group-hover:underline legend dark:darkBg dark:text-white bg-white text-black">
                  {t("signin")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
      {type !== "loginPage" && <LoginModalClose type={type} />}
    </div>
  );
};

const WhenForgotten = ({ type, setIsForgotten }: CustomModalProps) => {
  const [state, handle] = useFormState(onEmailForgotten, { data: false });
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
      className="auth-form-content dark:mediumDarkBg"
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
      {type !== "loginPage" && <LoginModalClose type={type} />}
    </form>
  );
};

export default function LoginModalContent({ type }: CustomModalProps) {
  const [subscribingData, setSubscribingData] = useState<
    undefined | SignupCookiePayload
  >();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isForgotten, setIsForgotten] = useState(false);
  const md = useMediaQuery("(max-width:900px)");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user as UserState);

  useEffect(() => {
    if (isForgotten) setIsSubscribing(false);
    if (isSubscribing) setIsForgotten(false);
  }, [isSubscribing, isForgotten]);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return !loading ? (
    <div role="login-modal-content" className="w-full flex-center">
      {isSubscribing || subscribingData ? (
        <div className={md ? "sm-auth-container" : "lg-auth-container"}>
          <WhenSubscribin type={type} setIsSubscribing={setIsSubscribing} />
        </div>
      ) : isForgotten ? (
        <div className={md ? "sm-auth-container" : "lg-auth-container"}>
          <WhenForgotten type={type} setIsForgotten={setIsForgotten} />
        </div>
      ) : (
        <div className={md ? "sm-auth-container" : "lg-auth-container"}>
          <WhenLogin
            type={type}
            setIsSubscribing={setIsSubscribing}
            setIsForgotten={setIsForgotten}
          />
        </div>
      )}
    </div>
  ) : undefined;
}
