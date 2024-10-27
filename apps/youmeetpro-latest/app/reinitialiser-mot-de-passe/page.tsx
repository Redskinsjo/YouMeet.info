"use client";
import React, { useCallback, useEffect, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import verifyTokenBrowser from "@youmeet/utils/basics/verifyTokenBrowser";
import ResetPasswordContent from "./resetPasswordContent";
import Footer from "@youmeet/ui/Footer";
import { usePathname, useRouter } from "next/navigation";

export default function ResetPassword() {
  const pathname = usePathname();

  const [userId, setUserId] = useState("");
  const router = useRouter();

  const verifyToken = useCallback(async () => {
    const verified = await verifyTokenBrowser(pathname);
    if (verified?.userId) setUserId(verified.userId);
    else router.push("/");
  }, [pathname]);

  useEffect(() => {
    router.prefetch("/");
    verifyToken();
  }, []);

  return (
    !!userId && (
      <div className="h-screen w-full">
        <div
          className="h-screen flex-center w-full"
          style={{ background: blueGrey[50] }}
        >
          <div className="flex flex-col items-center h-full w-full box-border p-[4px] m-[12px] rounded-lg shadow-2xl md:max-w-none md:max-h-none">
            <ResetPasswordContent userId={userId} />
          </div>
        </div>
        <Footer />
      </div>
    )
  );
}
