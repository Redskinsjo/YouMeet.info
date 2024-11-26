"use client";

import dynamic from "next/dynamic";

const UserNotices = dynamic(() => import("./UserNotices"), {
  ssr: false,
});

export default function fnc() {
  return <UserNotices />;
}
