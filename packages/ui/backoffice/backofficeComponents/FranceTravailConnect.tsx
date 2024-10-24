"use client";

import { uri } from "@youmeet/functions/imports";
import { forwardRef, Reference } from "react";

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

function FranceTravailConnect({ className }: { className: string }, ref: any) {
  return (
    <ft-connect
      data-mode=""
      ref={ref}
      className={className}
      onClick={async () => {
        const search = new URLSearchParams({ realm: "/individu" });
        const response = await fetch(
          `${uri}/api/auth/francetravail/consent?${search}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log(data, "data");
      }}
    ></ft-connect>
  );
}

export default forwardRef(FranceTravailConnect);
