"use client";
import dynamic from "next/dynamic";
import Header from "../Header";
import { Suspense, useEffect, useState } from "react";

export default function BigHeaderSection() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (scrollY > window.scrollY) setScrollingDown(false);
      else setScrollingDown(true);
      setScrollY(window.scrollY);
    });
  }, [scrollY, setScrollingDown]);

  return (
    <section className="flex flex-col w-full">
      <Suspense>
        <Header />
      </Suspense>

      {scrollY >= 100 && !scrollingDown && (
        <Suspense>
          <Header
            newStyles={{
              zIndex: 90,
              top: 0,
              position: "fixed",
              animation: "fadeIn 0.8s 1 ease-in-out",
            }}
          />
        </Suspense>
      )}
    </section>
  );
}
