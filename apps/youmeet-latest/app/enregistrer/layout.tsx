import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-[6px]">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://www.youmeet.info/enregistrer" />
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
            name: "Espace Personnel Candidat - Enregistrer une vidéo",
            description:
              "Ajoutez une vidéo en l'enregistrant directement sur la plateforme. Optimisez votre expérience sur la plateforme.",
            url: "https://www.youmeet.info/enregistrer",
            potentialAction: [
              {
                "@type": "AddAction",
                name: "Ajoutez une Vidéo en l'enregistrant directement sur la plateforme",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.youmeet.info/enregistrer",
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
