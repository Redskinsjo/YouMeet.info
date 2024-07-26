import Footer from "@youmeet/components/Footer";
import dynamic from "next/dynamic";

const ErrorChild = dynamic(() => import("@youmeet/components/ErrorChild"), {
  ssr: false,
});

export default async function Custom404() {
  return (
    <div className="flex flex-col h-screen">
      <ErrorChild />
      <Footer />
    </div>
  );
}
