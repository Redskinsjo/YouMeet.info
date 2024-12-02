import React from "react";
import HomeChild from "./homeChild";
import { Metadata } from "next";
import {
  githubUrl,
  linkedinUrl,
  logoUrl,
  NAME,
  uri,
} from "@youmeet/functions/imports";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(uri),
  title: "YouMeet - CV vidéos, références",
  description:
    "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
  openGraph: {
    title: "YouMeet - CV vidéos, références",
    description:
      "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
    type: "website",
    countryName: "France",
    images: [logoUrl],
    url: "/",
    siteName: "YouMeet.info",
    phoneNumbers: "0756908001",
  },
  applicationName: "YouMeet",
  authors: [
    { name: NAME, url: githubUrl },
    {
      name: NAME,
      url: linkedinUrl,
    },
  ],
  category: "Plateforme de CV Vidéo, ATS",
  creator: NAME,
  keywords: [
    "YouMeet.info",
    "CV Vidéo",
    "profil public",
    "vérification des antécédents",
    "référencement",
    "informations",
  ],
};
//

export default function Home() {
  return (
    <div className="overflow-hidden max-w-screen">
      <link rel="preconnect" href="https://res.cloudinary.com/" />
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="canonical" href={uri} />
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
            "@type": "WebSite",
            name: "YouMeet - Recrutement, CVs Vidéos",
            description:
              "Bienvenue sur notre plateforme de recrutement. Découvrez des profils de candidats qualifiés par vidéo.",
            url: uri,
            image: logoUrl,
            inLanguage: "fr-FR",
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: uri,
            },
          }),
        }}
        key="product-jsonld"
      />
      <HomeChild />
    </div>
  );
}
