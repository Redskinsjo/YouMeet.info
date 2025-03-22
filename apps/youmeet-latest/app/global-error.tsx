"use client";
import ErrorComponent from "@youmeet/ui/ErrorComponent";

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
        <ErrorComponent error={error} reset={reset} />;
      </body>
    </html>
  );
}
