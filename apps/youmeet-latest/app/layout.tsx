import { ReactElement } from "react";

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="fr">
      <body>
        <script src="https://cdn.francetravail.fr/webco/v1/ft-connect.js"></script>
        {children}
      </body>
    </html>
  );
}
