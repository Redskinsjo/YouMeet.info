import { ReactElement } from "react";
import Providers from "./providers";
import Template from "./template";

const fnc = function RootLayout({
  children,
  loginModal,
  recordModal,
}: {
  children: ReactElement;
  loginModal: ReactElement;
  recordModal: ReactElement;
}) {
  return (
    <html lang="fr">
      <body>
        <script src="https://cdn.francetravail.fr/webco/v1/ft-connect.js"></script>
        <Providers modals={{ loginModal, recordModal }}>
          <Template key={"1"}>{children}</Template>
        </Providers>
      </body>
    </html>
  );
} as any;

export default fnc;
