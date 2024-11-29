import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";
import LoginPageComponent from "@youmeet/ui/loginPageComponents/LoginPage";

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
  return <LoginPageComponent />;
}
