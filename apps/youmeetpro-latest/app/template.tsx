import AuthUpdate from "./authUpdate";
import { Suspense } from "react";

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
