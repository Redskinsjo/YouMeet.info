import { ReactElement } from "react";
import Providers from "./providers";
import Template from "./template";

export default function RootLayout({
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
        <Providers modals={{ loginModal, recordModal }}>
          <Template key={"1"}>{children}</Template>
        </Providers>
      </body>
    </html>
  );
}
