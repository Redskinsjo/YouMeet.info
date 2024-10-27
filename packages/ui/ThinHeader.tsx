"use client";
import { CgDarkMode } from "react-icons/cg";
import Logo from "./Logo";
import { RiLoginCircleLine } from "react-icons/ri";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState, storeUser } from "@youmeet/global-config/features/user";
import MenuAuthenticatedUser from "./MenuAuthenticatedUser";
import verifyTokenBrowser from "@youmeet/utils/basics/verifyTokenBrowser";
import { getUser } from "@youmeet/functions/request";
import { usePathname } from "next/navigation";
import NotificationsIconComponent from "./NotificationsIconComponent";
import { BetaUser } from "@youmeet/gql/generated";
import Link from "next/link";
import { setLogin } from "@youmeet/global-config/features/global";
import { UnknownAction } from "@reduxjs/toolkit";

export default function ThinHeader({
  setDark,
}: {
  setDark: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const fetchAndStoreUser = useCallback(async () => {
    const verified = await verifyTokenBrowser(pathname);
    if (verified?.userId) {
      const user = (await getUser<BetaUser>({
        userId: verified.userId,
      })) as BetaUser;
      if (user?.id) dispatch(storeUser(user));
    }
  }, [pathname]);

  useEffect(() => {
    fetchAndStoreUser();
  }, []);

  return (
    <div className="p-[6px] w-full flex-bet dark:darkBg lightBg box-border">
      <div className="flex-center gap-[6px]">
        <Logo />
      </div>
      <div className="cursor-pointer p-[1px] box-border flex-center gap-[12px]">
        {/* {!pathname.includes("/offres") &&
            pathname !== "/" &&
            pathname !== "/blog" &&
            !pathname.includes("/medias") && (
              <Link
                role="link"
                title="Voir les offres d'emplois proposées par les entreprises."
                href={`/offres`}
                className="text-black dark:text-deepPurple900 no-underline"
              >
                <div className="flex-center h-[25px] w-fit">
                  {t("company-offers")}
                </div>
              </Link>
            )} */}
        {/* <div className="flex-center h-[25px] w-[25px]">
            <CgDarkMode
              className="w-full h-full"
              onClick={() => setDark((dark) => !dark)}
            />
          </div> */}
        {pathname === "/dashboard" && <NotificationsIconComponent />}
        {!user.id && pathname !== "/se-connecter" ? (
          <Link
            role="link"
            href={"/se-connecter"}
            onClick={() => {
              dispatch(setLogin(true) as UnknownAction);
            }}
            title="Se connecter à son compte utilisateur sur YouMeet.info"
          >
            <div className="flex-center h-[25px] w-[25px]">
              <RiLoginCircleLine className="w-full h-full" />
            </div>
          </Link>
        ) : user.id ? (
          <MenuAuthenticatedUser />
        ) : undefined}
      </div>
    </div>
  );
}
