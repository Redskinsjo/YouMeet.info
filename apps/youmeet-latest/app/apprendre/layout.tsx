import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl, NAME, uri } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Biographies`,
  description:
    "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  keywords: ["learn", "articles", "informations", "renseignements", "suivi"],
  openGraph: {
    title: `YouMeet - apprendre`,
    images: [logoUrl],
    url: `${uri}/apprendre`,
    type: "website",
    description:
      "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  },
  category: "Abonnements",
  creator: NAME,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/apprendre`} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <GoogleTagAndHotjarComponent />
      <Script
        id="ld-json"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "Articles d'informations sur l'écosystème du recrutement selon YouMeet et pour les entreprises",
            description:
              "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
            url: `${uri}/apprendre`,
            image: logoUrl,
            brand: {
              "@type": "Brand",
              name: "YouMeet",
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
