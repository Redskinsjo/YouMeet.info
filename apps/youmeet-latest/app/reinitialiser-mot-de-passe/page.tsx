"use client";
import React, { useCallback, useEffect, useState } from "react";
import verifyTokenBrowser from "@youmeet/utils/basics/verifyTokenBrowser";
import ResetPasswordContent from "./resetPasswordContent";
import Footer from "@youmeet/ui/Footer";
import { usePathname, useRouter } from "next/navigation";

export default async function ResetPassword() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const pathname = usePathname();

  const verifyToken = useCallback(async () => {
    const verified = await verifyTokenBrowser(pathname);
    if (verified?.userId) setUserId(verified.userId);
    else {
      router.push("/");
    }
  }, [pathname]);

  useEffect(() => {
    router.prefetch("/");
    verifyToken();
  }, []);

  return (
    !!userId && (
      <div>
        <ResetPasswordContent userId={userId} />
        <Footer />
      </div>
    )
  );
}
