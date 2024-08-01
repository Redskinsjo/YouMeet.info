import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: "YouMeet - Créer et diffuser une offre d'emploi",
  description:
    "Créez et diffusez une offre sur notre plateforme pour augmenter sa visibilité. Fournissez des informations sur l'opportunité et facilitez notre mise en relation avec les candidats qualifiés par vidéo de notre plateforme de recrutement.",
  openGraph: {
    title: "YouMeet - Créer et diffuser une offre d'emploi",
    type: "website",
    url: "creer-offer",
    images: [logoUrl],
    description:
      "Créez et diffusez une offre sur notre plateforme pour augmenter sa visibilité. Fournissez des informations sur l'opportunité et facilitez notre mise en relation avec les candidats qualifiés par vidéo de notre plateforme de recrutement.",
  },
  creator: "Jonathan Carnos",
  keywords: [
    "création",
    "diffusion",
    "offre",
    "emploi",
    "formulaire",
    "cv",
    "informations personnelles",
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col afterHeader">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://pro.youmeet.info/creer-offre" />
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
            name: "Formulaire de Création d'Offre d'Emploi",
            description:
              "Remplissez le formulaire pour créer une offre d'emploi et la diffuser sur notre plateforme. Fournissez des informations sur l'offre et obtenez une meilleure visibilité pour recruter.",
            url: "https://pro.youmeet.info/creer-offre",
            potentialAction: [
              {
                "@type": "Action",
                name: "Remplir le Formulaire",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/creer-offre",
                },
              },
              {
                "@type": "Action",
                name: "Soumettre le Formulaire",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/creer-offre",
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
