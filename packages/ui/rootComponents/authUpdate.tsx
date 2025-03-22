"use client";
import { useFetchedUser } from "@youmeet/functions/fetchUser";
import useRedirect from "@youmeet/global-config/useRedirect";

export default function AuthUpdate() {
  useFetchedUser();
  useRedirect();
  return <></>;
}
