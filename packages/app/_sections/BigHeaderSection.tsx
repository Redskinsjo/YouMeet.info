"use client";
import Header from "@youmeet/components/Header";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";

export default function BigHeaderSection() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (scrollY > window.scrollY) setScrollingDown(false);
      else setScrollingDown(true);
      setScrollY(window.scrollY);
    });
    setLoading(false);
  }, [scrollY, setScrollingDown]);

  return (
    !loading && (
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
              scrollY={scrollY}
            />
          </Suspense>
        )}
      </section>
    )
  );
}
