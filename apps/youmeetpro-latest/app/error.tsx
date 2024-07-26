"use client";
import Footer from "@youmeet/components/Footer";
import dynamic from "next/dynamic";

const ErrorChild = dynamic(() => import("@youmeet/components/ErrorChild"), {
  ssr: false,
});

export default function ServerError500({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col h-screen">
      <ErrorChild error={error} reset={reset} />
      <Footer />
    </div>
  );
}
