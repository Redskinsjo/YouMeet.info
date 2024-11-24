"use client";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CustomModalProps,
  SignupCookiePayload,
} from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";

const WhenSubscribing = dynamic(() => import("./WhenSubscribingChild"));
const WhenLogin = dynamic(() => import("./WhenLoginChild"));
const WhenForgotten = dynamic(() => import("./WhenForgottenChild"));

export default function LoginModalContent({ type }: CustomModalProps) {
  const [subscribingData, setSubscribingData] = useState<
    undefined | SignupCookiePayload
  >();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isForgotten, setIsForgotten] = useState(false);
  const md = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    if (isForgotten) setIsSubscribing(false);
    if (isSubscribing) setIsForgotten(false);
  }, [isSubscribing, isForgotten]);

  return (
    <div role="login-modal-content" className="w-full flex-center">
      {isSubscribing || subscribingData ? (
        <div className={md ? "sm-auth-container" : "lg-auth-container"}>
          <WhenSubscribing type={type} setIsSubscribing={setIsSubscribing} />
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
  );
}
