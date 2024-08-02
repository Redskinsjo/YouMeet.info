import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - La Plateforme`,
  description:
    "Découvrez les fonctionnalités de notre plateforme de recrutement, facilitant la mise en relation optimale entre candidats et recruteurs. Explorez comment nous innovons pour rendre le processus de recrutement plus efficace et transparent.",
  keywords: [
    "plateforme",
    "détails concurrentiels",
    "explications sur le service",
    "utilisation",
    "avantages",
    "informations",
  ],
  openGraph: {
    title: `YouMeet - La Plateforme`,
    images: [logoUrl],
    url: `le-produit`,
    type: "website",
    description:
      "Découvrez les fonctionnalités de notre plateforme de recrutement, facilitant la mise en relation optimale entre candidats et recruteurs. Explorez comment nous innovons pour rendre le processus de recrutement plus efficace et transparent.",
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
      <link rel="canonical" href="https://pro.youmeet.info/le-produit" />
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
            name: "Solution Complète de Prise de Références Automatisées",
            description:
              "Optimisez vos processus de recrutement avec notre application de prise de références automatisées. Découvrez ses fonctionnalités et avantages.",
            url: "https://pro.youmeet.info/le-produit",
            image:
              "https://res.cloudinary.com/de822mdsy/image/upload/v1691348066/youmeet-official/webp/logo-favicon_yvmhxq.webp",
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
