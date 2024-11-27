import { ReactElement } from "react";
import Providers from "@youmeet/ui/rootComponents/providers";
import Template from "./template";

const fnc = function RootLayout({
  children,
  loginModal,
  recordModal,
  videoAddingModal,
  messageModal,
}: {
  children: ReactElement;
  loginModal: ReactElement;
  recordModal: ReactElement;
  videoAddingModal: ReactElement;
  messageModal: ReactElement;
}) {
  return (
    <html lang="fr">
      <body>
        <script src="https://cdn.francetravail.fr/webco/v1/ft-connect.js"></script>
        <Providers
          modals={{ loginModal, recordModal, videoAddingModal, messageModal }}
        >
          <Template key={"1"}>{children}</Template>
        </Providers>
      </body>
    </html>
  );
} as any;

export default fnc;
