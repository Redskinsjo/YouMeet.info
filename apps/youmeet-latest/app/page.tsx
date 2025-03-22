import React from "react";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import { Metadata } from "next";
import {
  githubUrl,
  linkedinUrl,
  logoUrl,
  NAME,
  uri,
} from "@youmeet/functions/imports";
import Script from "next/script";
import {
  getHomeCompetencies,
  getHomeOffers,
  getVideos,
} from "@youmeet/functions/request";
import { Competency, Offer, Video } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const HomeChild = dynamic(
  () => import("@youmeet/ui/_homeComponents/homeChild")
);

export const metadata: Metadata = {
  title:
    "YouMeet - Informations professionnelles et fiables sur des candidats et chercheurs d'emplois",
  description:
    "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
  openGraph: {
    title:
      "YouMeet - Informations professionnelles et fiables sur des candidats et chercheurs d'emplois",
    description:
      "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
    type: "website",
    countryName: "France",
    images: [logoUrl],
    url: uri,
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
  // })) as Competency[];
  const videos = (await getVideos<Video[]>({}, 0)) as Video[];

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
            name: "YouMeet - Informations professionnelles et fiables sur des candidats et chercheurs d'emplois",
            description:
              "Bienvenue sur notre plateforme de recrutement innovante. Découvrez des opportunités passionnantes et connectez-vous avec des talents exceptionnels.",
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

      <HomeChild offers={[]} competences={[]} videos={videos.slice(0, 3)} />
    </div>
  );
}
