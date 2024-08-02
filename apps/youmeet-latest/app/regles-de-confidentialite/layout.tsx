import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Règles de confidentialité`,
  description:
    "Consultez nos règles de confidentialité pour comprendre comment nous traitons vos informations personnelles et assurons la sécurité de vos données sur notre plateforme de recrutement.",
  openGraph: {
    title: `YouMeet - Règles de confidentialité`,
    images: [logoUrl],
    url: "https://www.youmeet.info/regles-de-confidentialite",
    description:
      "Consultez nos règles de confidentialité pour comprendre comment nous traitons vos informations personnelles et assurons la sécurité de vos données sur notre plateforme de recrutement.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link
        rel="canonical"
        href="https://www.youmeet.info/regles-de-confidentialite"
      />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <Script
        strategy="afterInteractive"
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Règles de Confidentialité",
            description:
              "Consultez nos règles de confidentialité pour comprendre comment nous traitons vos informations personnelles.",
            url: "https://www.youmeet.info/regles-de-confidentialite",
            datePublished: "2023-12-23",
            dateModified: "2023-12-23",
            author: {
              "@type": "Organization",
              name: "YouMeet",
            },
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: "https://www.youmeet.info",
            },
          }),
        }}
        key="product-jsonld"
      />

      {children}
    </div>
  );
}
