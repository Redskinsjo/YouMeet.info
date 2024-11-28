"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ViewChild({ view }: { view: ReactNode }) {
  const pathname = usePathname();
  return pathname !== "/offres" && view;
}
