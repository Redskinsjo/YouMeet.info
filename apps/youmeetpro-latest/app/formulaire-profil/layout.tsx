import GoogleTagAndHotjarComponent from "@youmeet/components/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: "YouMeet - Complétez votre Profil Candidat",
  description:
    "Remplissez votre profil sur notre plateforme de recrutement en ajoutant vos informations personnelles et professionnelles. Optimisez votre visibilité auprès des recruteurs en présentant votre expérience et vos compétences.",
  openGraph: {
    title: "YouMeet - Complétez votre Profil Candidat",
    type: "website",
    url: "formulaire-profil",
    images: [logoUrl],
    description:
      "Remplissez votre profil sur notre plateforme de recrutement en ajoutant vos informations personnelles et professionnelles. Optimisez votre visibilité auprès des recruteurs en présentant votre expérience et vos compétences.",
  },
  creator: "Jonathan Carnos",
  keywords: ["remplir profil", "formulaire", "cv", "informations personnelles"],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col afterHeader">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://pro.youmeet.info/formulaire-profil" />
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
            name: "Formulaire de Profil Candidat - Plateforme de Recrutement",
            description:
              "Remplissez le formulaire pour créer votre profil professionnel en tant que recruteur. Fournissez des informations sur votre entreprise et facilitez la mise en relation avec des candidats qualifiés sur notre plateforme de recrutement.",
            url: "https://pro.youmeet.info/formulaire-profil",
            potentialAction: [
              {
                "@type": "Action",
                name: "Remplir le Formulaire de Profil",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/formulaire-profil",
                },
              },
              {
                "@type": "Action",
                name: "Soumettre le Formulaire",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/formulaire-profil",
                },
              },
            ],
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
