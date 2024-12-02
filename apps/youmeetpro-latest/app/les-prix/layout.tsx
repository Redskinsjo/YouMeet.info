import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { logoUrl, NAME, uri } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Les Tarifs`,
  description:
    "Découvrez nos différentes offres, les fonctionnalités incluses, et les tarifs pour utiliser notre plateforme de recrutement. Choisissez l'abonnement qui correspond le mieux à vos besoins.",
  keywords: [
    "prix",
    "abonnements",
    "professionnal",
    "utilisation de l'application",
    "consulter des cv vidéos",
  ],
  openGraph: {
    title: `YouMeet - Les Tarifs`,
    images: [logoUrl],
    url: `les-prix`,
    type: "website",
    description:
      "Découvrez nos différentes offres, les fonctionnalités incluses, et les tarifs pour utiliser notre plateforme de recrutement. Choisissez l'abonnement qui correspond le mieux à vos besoins.",
  },
  category: "Abonnements",
  creator: NAME,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/les-prix`} />
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
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Les Tarifs et Descriptions des Offres",
            description:
              "Découvrez nos différentes offres, les fonctionnalités incluses, et les tarifs pour utiliser notre plateforme de recrutement. Choisissez l'abonnement qui correspond le mieux à vos besoins.",
            url: `${uri}/les-prix`,
            offers: [
              {
                "@type": "Offer",
                price: "3",
                name: "Verifié",
                description:
                  "Pour les candidats, nous offrons la possibilité d'obtenir de la part de YouMeet un référencement de vos expériences professionnelles et diplômes, en plus de créer votre profil public et votre vidéo de présentation",
                priceCurrency: "EUR",
                seller: {
                  "@type": "Organization",
                  name: "YouMeet",
                  url: uri,
                },
              },
              {
                "@type": "Offer",
                price: "45",
                name: "Premium",
                description:
                  "Pour les recruteurs, nous offrons la possibilité de consulter des profils qualifiés, de regarder leurs vidéos de présentation et d'obtenir leurs références professionnelles et académiques, en plus de diffuser des offres d'emploi et de proposer des entretiens à ces candidats.",
                priceCurrency: "EUR",
                seller: {
                  "@type": "Organization",
                  name: "YouMeet",
                  url: uri,
                },
              },
              {
                "@type": "Offer",
                price: "59",
                name: "Chatbot",
                description:
                  "Pour les recruteurs, nous offrons la possibilité d'obtenir, en plus de toutes les fonctionnalités Premium, un chatbot qui permette d'automatiser la prise de contacts, faisant gagner du temps.",
                priceCurrency: "EUR",
                seller: {
                  "@type": "Organization",
                  name: "YouMeet",
                  url: uri,
                },
              },
            ],
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
