import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import AdmitCGU from "../AdmitCGU";
import dynamic from "next/dynamic";
import { GlobalState } from "@youmeet/global-config/features/global";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));
export default function LoginComponentTopPart() {
  const ftConnectRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const redirect = useSelector(
    (state: RootState) => (state.global as GlobalState).redirect
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (ftConnectRef) {
      const root = ftConnectRef.current?.shadowRoot;
      const styles =
        "background-color: white;color: black;width: 100%;font-size: 14px; height: 42.5px";
      root?.querySelector("button")?.setAttribute("style", styles);
    }
  }, []);

  return (
    <div className="flex-center flex-col flex-1 gap-[36px] xs:gap-[18px] sm:gap-[18px] md:gap-[18px]">
      <Logo png />
      <h1 className="m-0 p-0 titles text-center dark:text-white">
        {t("login")}
      </h1>
      <div className="w-full flex flex-col gap-[24px]">
        {process.env.APP === "candidate" && (
          <form
            name="google-signin"
            method="POST"
            action={`/api/auth/google/oauth?${new URLSearchParams({
              redirect,
              choice: searchParams.get("choice") as string,
              email: searchParams.get("email") as string,
              id: searchParams.get("id") as string,
              customer: searchParams.get("customerId") as string,
            })}`}
            className="no-underline w-full"
            tabIndex={-1}
          >
            <Button
              className="subItem w-full flex-center gap-[12px] rounded-full text-black bg-white border-[1px] border-black normal-case border-[0.5px] border-solid border-grey300 hover:bg-grey100"
              style={{ height: 42.5, fontSize: "14px" }}
              tabIndex={-1}
              type="submit"
            >
              <p>{t("google-signin")}</p>
              <FcGoogle className="item" />
            </Button>
          </form>
        )}
        {/* <FranceTravailConnect
          className="dark:FTConnectDark FTConnect"
          ref={ftConnectRef}
        /> */}
        <AdmitCGU />
        <Divider />
      </div>
    </div>
  );
}
