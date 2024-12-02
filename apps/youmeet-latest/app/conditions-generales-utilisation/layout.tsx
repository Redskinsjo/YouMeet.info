import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { logoUrl, uri } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Conditions Générales d'Utilisation`,
  description:
    "Consultez nos conditions générales d'utilisation pour utiliser notre plateforme de recrutement. Informations sur les règles, les droits et les responsabilités des utilisateurs.",
  openGraph: {
    title: `YouMeet - Conditions Générales d'Utilisation`,
    type: "article",
    url: `${uri}/conditions-generales-utilisation`,
    images: [logoUrl],
    description:
      "Consultez nos conditions générales d'utilisation pour utiliser notre plateforme de recrutement. Informations sur les règles, les droits et les responsabilités des utilisateurs.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="YouMeet/conditions-generales-utilisation" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <Script
        strategy="afterInteractive"
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            name: "Conditions Générales d'Utilisation",
            description:
              "Consultez nos conditions générales d'utilisation pour utiliser notre plateforme de recrutement. Informations sur les règles, les droits et les responsabilités des utilisateurs.",
            url: `${uri}/conditions-generales-utilisation`,
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
