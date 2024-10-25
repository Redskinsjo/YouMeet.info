import React, { useState, useEffect } from "react";
import TooltipedAsset from "./TooltipedAsset";
import { useTranslation } from "react-i18next";
import { uri } from "@youmeet/functions/imports";
import { BetaUser } from "@youmeet/gql/generated";

export default function NewLinkComponent({ profil }: { profil: BetaUser }) {
  const { t } = useTranslation();
  const [copyLink, setCopyLink] = useState(false);
  const [displayLinkCopied, setDisplayLinkCopied] = useState(false);

  useEffect(() => {
    if (copyLink) {
      navigator.clipboard.writeText(`${uri}/${profil.uniqueName}`);
      setDisplayLinkCopied(true);

      setTimeout(() => setCopyLink(false), 500);
    }
    if (displayLinkCopied)
      setTimeout(() => {
        setDisplayLinkCopied(false);
      }, 2500);
  }, [copyLink, displayLinkCopied]);

  return (
    <TooltipedAsset
      asset={displayLinkCopied ? t("link-copied") : t("link-copy")}
    >
      <div
        className="flex-center text-center text-[14px] font-semibold break-any cursor-pointer w-fit rounded-[14px] text-cyan500 dark:text-cyan300 dark:lightDarkBg px-[6px]"
        style={{
          textRendering: "geometricPrecision",
          cursor: profil.isPublic ? "pointer" : "not-allowed",
        }}
        onClick={() => {
          if (profil.isPublic) setCopyLink(true);
        }}
      >
        {`${uri}/${profil.uniqueName}`}
      </div>
    </TooltipedAsset>
  );
}
