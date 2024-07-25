import React from "react";
import GoogleTagAndHotjarComponent from "@youmeet/components/GoogleTagAndHotjarComponent";
import { Metadata } from "next";
import { logoUrl, uri } from "@youmeet/functions/imports";
import HomeChild from "./homeChild";
import Script from "next/script";
import { getHomeCompetencies, getHomeOffers } from "@youmeet/functions/request";
import { GptCompetency, Offer } from "@youmeet/gql/generated";

export const metadata: Metadata = {
  title: "YouMeet - Mise en Relation Professionnelle et ATS par Vidéo et IA",
  description:
    "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
  openGraph: {
    title: "YouMeet - Mise en Relation Professionnelle et ATS par Vidéo et IA",
    description:
      "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
    type: "website",
    countryName: "France",
    images: [logoUrl],
    url: uri,
    siteName: "YouMeet.info",
    phoneNumbers: "0756908001",
    videos: [
      "https://res.cloudinary.com/de822mdsy/video/upload/v1706883143/mpj7eudgzw3xdtljvam8.mov",
    ],
  },
  applicationName: "YouMeet",
  authors: [
    { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
    {
      name: "Jonathan Carnos",
      url: "https://www.linkedin.com/in/jonathancarnos123/",
    },
  ],
  category: "Plateforme de CV Vidéo, ATS",
  creator: "Jonathan Carnos",
  keywords: [
    "YouMeet.info",
    "CV Vidéo",
    "profil public",
    "Intelligence Artificielle",
    "vidéo",
    "recrutement",
    "emploi",
    "entretien",
    "candidature",
    "compétences",
    "vérification des antécédents",
    "références professionnelles",
    "informations",
  ],
};

export default async function Home() {
  // const offers = (await getHomeOffers<Offer>({
  //   params: { take: 3 },
  // })) as Offer[];
  // const competences = (await getHomeCompetencies({
  //   params: { take: 2 },
  // })) as GptCompetency[];
  return (
    <div className="overflow-hidden max-w-screen">
      <link rel="preconnect" href="https://res.cloudinary.com/" />
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="canonical" href="https://www.youmeet.info/" />
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
            name: "YouMeet - Mise en Relation Professionnelle et ATS par Vidéo et IA",
            description:
              "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
            url: "https://www.youmeet.info/",
            image: logoUrl,
            inLanguage: "fr-FR",
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: "https://www.youmeet.info",
            },
          }),
        }}
        key="product-jsonld"
      />

      <HomeChild offers={[]} competences={[]} />
    </div>
  );
}
