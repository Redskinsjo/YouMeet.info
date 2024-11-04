"use client";
import dynamic from "next/dynamic";
const Logo = dynamic(() => import("./Logo"), { ssr: false });

export default function fnc({
  gif,
  size = 25,
  link = true,
  png = false,
}: {
  link?: boolean;
  gif?: boolean;
  size?: number;
  png?: boolean;
}) {
  return <Logo gif={gif} link={link} size={size} png={png} />;
}
