import dynamic from "next/dynamic";
import { Suspense } from "react";

const AuthUpdate = dynamic(
  () => import("@youmeet/ui/rootComponents/authUpdate")
);

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense>
        <AuthUpdate />
      </Suspense>

      {children}
    </div>
  );
}
