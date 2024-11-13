"use client";

import dynamic from "next/dynamic";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));

export default function Loading() {
  return (
    <div className="h-screen flex-center w-[600px] offerView">
      <Logo gif png />
    </div>
  );
}
