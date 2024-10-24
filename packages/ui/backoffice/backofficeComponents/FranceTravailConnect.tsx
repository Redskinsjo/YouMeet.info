"use client";

import { uri } from "@youmeet/functions/imports";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ft-connect": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function FranceTravailConnect() {
  return (
    <ft-connect
      data-mode="light"
      onClick={async () => {
        const response = await fetch(`${uri}/api/access_francetravail`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data, "data");
      }}
    ></ft-connect>
  );
}
