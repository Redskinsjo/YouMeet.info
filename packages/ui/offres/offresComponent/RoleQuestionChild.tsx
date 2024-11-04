"use client";
import dynamic from "next/dynamic";

const RoleQuestion = dynamic(() => import("./RoleQuestion"), { ssr: false });

export default function fnc() {
  return <RoleQuestion />;
}
