"use client";

import dynamic from "next/dynamic";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));

export default function Loading() {
  return (
    <div className="flex-center h-screen">
      <Logo gif png />
    </div>
  );
}
