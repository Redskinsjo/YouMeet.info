import Script from "next/script";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `Réinitialiser mot de passe`,
  description:
    "Réinitialisez votre mot de passe sur notre plateforme de recrutement. Suivez les étapes simples pour sécuriser votre compte et accéder à de nouvelles opportunités professionnelles.",
  openGraph: {
    title: "Réinitialiser mot de passe",
    url: "https://pro.youmeet.info/reinitialiser-mot-de-passe",
    images: [
      "https://res.cloudinary.com/de822mdsy/image/upload/v1705698917/youmeet-official/webp/dqykgwibzdzyub26xe5h.webp",
    ],
    description:
      "Réinitialisez votre mot de passe sur notre plateforme de recrutement. Suivez les étapes simples pour sécuriser votre compte et accéder à de nouvelles opportunités professionnelles.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link
        rel="canonical"
        href="https://pro.youmeet.info/reinitialiser-mot-de-passe"
      />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <Script
        strategy="afterInteractive"
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Réinitialiser Mot de Passe - Plateforme de Recrutement",
            description:
              "Réinitialisez votre mot de passe sur notre plateforme de recrutement. Suivez les étapes simples pour sécuriser votre compte et accéder à de nouvelles opportunités professionnelles.",
            url: "https://pro.youmeet.info/reinitialiser-mot-de-passe",
            inLanguage: "fr-FR",
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
