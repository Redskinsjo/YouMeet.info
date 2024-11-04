import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NotFoundChild = dynamic(() => import("@youmeet/ui/NotFoundChild"));

export default async function Custom404() {
  return (
    <div className="flex flex-col h-screen">
      <Suspense>
        <NotFoundChild />
      </Suspense>
      <Footer />
    </div>
  );
}
