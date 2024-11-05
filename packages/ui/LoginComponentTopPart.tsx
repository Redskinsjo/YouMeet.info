import React, { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePathname, useSearchParams } from "next/navigation";
import { renderUrlQuery } from "@youmeet/utils/basics/renderUrlQuery";
import AdmitCGU from "./AdmitCGU";
import FranceTravailConnect from "./backoffice/backofficeComponents/FranceTravailConnect";
import dynamic from "next/dynamic";
const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));
export default function LoginComponentTopPart() {
  const ftConnectRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchRedirect = encodeURIComponent(searchParams.get("redirect") || "");
  const redirect = searchRedirect
    ? searchRedirect
    : pathname === "/" || pathname === "/se-connecter"
    ? "dashboard"
    : pathname;

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
            action={`/api/auth/google/oauth?${renderUrlQuery({
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
              className="subItem w-full flex-center gap-[12px] rounded-full text-black bg-white border-[1px] border-black"
              style={{ height: 42.5, fontSize: "14px" }}
              tabIndex={-1}
              type="submit"
            >
              <p>{t("google-signin")}</p>
              <FcGoogle className="item" />
            </Button>
          </form>
        )}
        <FranceTravailConnect
          className="dark:FTConnectDark FTConnect"
          ref={ftConnectRef}
        />
        <AdmitCGU />
        <Divider />
      </div>
    </div>
  );
}
