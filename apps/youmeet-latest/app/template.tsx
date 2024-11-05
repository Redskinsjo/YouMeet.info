import dynamic from "next/dynamic";
import { Suspense } from "react";

const AuthUpdate = dynamic(() => import("./authUpdate"));

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
