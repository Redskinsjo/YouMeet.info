import { ReactElement } from "react";
import Providers from "./providers";
import Template from "./template";

export default function RootLayout(props: {
  children: ReactElement;
  sharingModal: ReactElement;
  loginModal: ReactElement;
  videoModal: ReactElement;
}) {
  const { children, sharingModal, loginModal, videoModal } = props;
  return (
    <html lang="fr">
      <body>
        <Providers modals={{ sharingModal, loginModal, videoModal }}>
          <Template key={"1"}>{children}</Template>
        </Providers>
      </body>
    </html>
  );
}
