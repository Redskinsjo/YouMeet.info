"use client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { ModalState } from "@youmeet/global-config/features/modal";
import { RootState } from "@youmeet/global-config/store";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { outfit } from "@youmeet/functions/fonts";
import Modals from "@youmeet/components/_homeComponents/Modals";
import ThinHeader from "@youmeet/components/ThinHeader";
import { usePathname } from "next/navigation";

export default function ContentProvider({
  children,
  modals,
}: {
  children: ReactNode;
  modals: { [key: string]: ReactElement };
}) {
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const error = useSelector(
    (state: RootState) => (state.global as GlobalState).error
  );
  const modal = useSelector((state: RootState) => state.modal as ModalState);

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
    pathname === "/partage" ||
    pathname === "/se-connecter";
  return (
    <div
      className={
        dark
          ? `dark ${outfit.className} min-h-screen flex`
          : `${outfit.className} min-h-screen flex`
      }
    >
      <div
        className={
          isModal
            ? "dark:darkBg flex flex-col max-h-screen w-screen"
            : "dark:darkBg flex flex-col min-h-screen w-screen"
        }
      >
        <ThinHeader setDark={setDark} />
        <Modals />
        {modals.sharingModal}
        {modals.loginModal}
        {modals.videoModal}

        <div
          className={
            isModal
              ? "dark:darkBg flex flex-col max-h-screen overflow-hidden flex-1"
              : "dark:darkBg flex flex-col flex-1"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
