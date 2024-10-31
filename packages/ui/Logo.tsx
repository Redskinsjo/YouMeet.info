"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { logoUrl, logoUrlPng } from "@youmeet/functions/imports";

export default function Logo({
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
  const user = useSelector((state: RootState) => state.user as UserState);

  const url = png ? logoUrlPng : logoUrl;

  return gif ? (
    <>
      <Image
        role="img"
        className="animate-pulse dark:hidden"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
      <Image
        role="img"
        className="animate-pulse hidden dark:block"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
    </>
  ) : link ? (
    <Link
      role="link"
      href={user.id ? "/dashboard" : "/"}
      passHref
      style={{ height: "fit-content", display: "flex", alignItems: "center" }}
      tabIndex={-1}
    >
      <Image
        role="img"
        className="dark:hidden"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
      <Image
        role="img"
        className="hidden dark:block"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
        style={{
          cursor: "pointer",
        }}
      />
    </Link>
  ) : (
    <>
      <Image
        role="img"
        className="dark:hidden"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
      />
      <Image
        role="img"
        className="hidden dark:block"
        src={url}
        alt="logo de YouMeet.info"
        title="logo de YouMeet.info"
        width={size}
        height={size}
      />
    </>
  );
}
