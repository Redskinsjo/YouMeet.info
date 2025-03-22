"use client";
import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";

const ErrorChild = dynamic(() => import("@youmeet/ui/ErrorChild"));

export default function ServerError500({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen flex flex-col h-screen">
          <ErrorChild error={error} reset={reset} />
          <Footer />
        </div>
      </body>
    </html>
  );
}
