"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const Header = dynamic(() => import("../HeaderChild"), { ssr: false });

export default function BigHeaderSection() {
  return (
    <section className="flex flex-col w-full">
      <Suspense>
        <Header />
      </Suspense>
    </section>
  );
}
