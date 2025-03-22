"use client";
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

  useEffect(() => {
    if (isForgotten) setIsSubscribing(false);
    if (isSubscribing) setIsForgotten(false);
  }, [isSubscribing, isForgotten]);

  return (
    <div
      className="modal-content bg-grey200"
      onClick={(e) => e.stopPropagation()}
    >
      {isSubscribing || subscribingData ? (
        <WhenSubscribing type={type} setIsSubscribing={setIsSubscribing} />
      ) : isForgotten ? (
        <WhenForgotten type={type} setIsForgotten={setIsForgotten} />
      ) : (
        <WhenLogin
          type={type}
          setIsSubscribing={setIsSubscribing}
          setIsForgotten={setIsForgotten}
        />
      )}
    </div>
  );
}
