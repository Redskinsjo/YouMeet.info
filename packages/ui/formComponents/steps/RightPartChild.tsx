"use client";
import dynamic from "next/dynamic";
import RightPartFormComponentLoading from "./RightPartFormComponentLoading";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";

const RightPartFormComponent = dynamic(
  () => import("./RightPartFormComponent"),
  { ssr: false, loading: () => <RightPartFormComponentLoading /> }
);

export default function fnc({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  return <RightPartFormComponent defaultValues={defaultValues} />;
}
