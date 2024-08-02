import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `YouMeet - Gestion de votre Compte Recruteur`,
  description:
    "Gérez vos informations personnelles et professionnelles, la vidéo de votre entreprise, souscrivez à un abonnement sur notre plateforme de recrutement pour recruteurs. Optimisez votre expérience sur la plateforme.",
  keywords: [
    "dashboard",
    "profil privé",
    "cv vidéo",
    "paramétrage",
    "formulaire",
  ],

  category: "Profil public",
  creator: "Jonathan Carnos",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://pro.youmeet.info/compte" />
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
            name: "Espace Personnel Recruteur - Plateforme de Recrutement",
            description:
              "Gérez vos informations professionnelles, la vidéo de votre entreprise, souscrivez à un abonnement sur notre plateforme de recrutement pour recruteurs. Optimisez votre expérience sur la plateforme.",
            url: "https://pro.youmeet.info/compte",
            potentialAction: [
              {
                "@type": "SubscribeAction",
                name: "Souscrire à un Abonnement",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/compte",
                },
              },
              {
                "@type": "ViewAction",
                name: "Voir les Informations Professionnelles",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/compte",
                },
              },
              {
                "@type": "WatchAction",
                name: "Visionner la Vidéo de l'Entreprise",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/compte",
                },
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: "https://pro.youmeet.info",
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
