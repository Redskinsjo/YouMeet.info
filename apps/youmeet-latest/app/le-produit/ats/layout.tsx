import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl, uri } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - ATS vidéo`,
  description:
    "Optimisez vos processus de recrutement avec notre portail ATS. Récupérez des profils qualifiés par vidéo, analysez leurs compétences grâce à l'IA.",
  keywords: [
    "ats",
    "candidatures par vidéo",
    "processus de recrutement",
    "amélioration des recrutements",
    "profils qualifiés",
    "informations",
  ],
  openGraph: {
    title: `YouMeet - ATS vidéo`,
    images: [logoUrl],
    url: `${uri}/le-produit/ats`,
    type: "website",
    description:
      "Optimisez vos processus de recrutement avec notre portail ATS. Récupérez des profils qualifiés par vidéo, analysez leurs compétences grâce à l'IA.",
  },
  category: "Abonnements",
  creator: "Jonathan Carnos",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://www.youmeet.info/le-produit/ats" />
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
            name: "Solution ATS YouMeet pour les entreprises",
            description:
              "Optimisez vos processus de recrutement avec notre portail ATS. Récupérez des profils qualifiés par vidéo, analysez leurs compétences grâce à l'IA.",
            url: "https://www.youmeet.info/le-produit/ats",
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
