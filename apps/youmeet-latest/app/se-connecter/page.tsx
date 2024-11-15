import LoginModalContent from "@youmeet/ui/LoginModalContent";
import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "YouMeet - Se Connecter",
  description:
    "Connectez-vous à notre plateforme de recrutement et explorez des opportunités passionnantes. Rencontrez des talents exceptionnels et trouvez le candidat idéal.",
  openGraph: {
    title: "YouMeet - Se Connecter",
    type: "website",
    url: "https://www.youmeet.info/se-connecter",
    images: [logoUrl],
    description:
      "Connectez-vous à notre plateforme de recrutement et explorez des opportunités passionnantes. Rencontrez des talents exceptionnels et trouvez le candidat idéal.",
  },
  keywords: [
    "se connecter",
    "cv vidéo",
    "profil",
    "recrutement",
    "chercheur d'emploi",
  ],
  creator: "Jonathan Carnos",
};

export default async function Login() {
  return (
    <div className="afterHeader h-full w-full flex-center bg-blueGrey50 dark:darkBg">
      <div className="flex-center w-full h-full">
        <Suspense>
          <LoginModalContent type="loginPage" />
        </Suspense>
      </div>
    </div>
  );
}
