"use client";
import Header from "../Header";
import { useEffect, useState } from "react";

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
      <Header />

      {scrollY >= 100 && !scrollingDown && (
        <Header
          newStyles={{
            zIndex: 90,
            top: 0,
            position: "fixed",
            animation: "fadeIn 0.8s 1 ease-in-out",
          }}
        />
      )}
    </section>
  );
}
