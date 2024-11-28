"use client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { outfit } from "@youmeet/functions/fonts";
import Modals from "@youmeet/ui/_homeComponents/Modals";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import OneLineSkeleton from "@youmeet/ui/OneLineSkeleton";

const ThinHeader = dynamic(() => import("@youmeet/ui/ThinHeader"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="39px" />,
});

export default function ContentProvider({
  children,
  modals,
}: {
  children: ReactElement;
  modals: { [key: string]: ReactElement };
}) {
  const [dark, setDark] = useState(false);
  const error = useSelector(
    (state: RootState) => (state.global as GlobalState).error
  );
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const pathname = usePathname();

  useEffect(() => {
    const isDark = localStorage.getItem("isDark");
    if (isDark === "2") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", dark ? "2" : "1");
  }, [dark]);

  const isModal =
    (modal.display && modal.display !== "home") ||
    error ||
    pathname === "/se-connecter" ||
    pathname === "/enregistrer";

  return (
    <div className={dark ? `dark ${outfit.className}` : `${outfit.className}`}>
      <div
        className={
          isModal
            ? "dark:darkBg flex flex-col h-screen"
            : "dark:darkBg flex flex-col min-h-screen"
        }
      >
        <ThinHeader setDark={setDark} />
        <Modals />
        {modals.recordModal}
        {modals.loginModal}
        {modals.videoAddingModal}

        <div
          className={
            isModal
              ? "dark:darkBg flex flex-col h-screen overflow-hidden"
              : "dark:darkBg flex flex-col flex-1"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
