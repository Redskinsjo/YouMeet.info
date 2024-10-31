import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";

const NotFoundChild = dynamic(() => import("@youmeet/ui/NotFoundChild"), {
  ssr: false,
});

export default async function Custom404(error: any, reset: any) {
  return (
    <div className="flex flex-col h-screen">
      <NotFoundChild />
      <Footer />
    </div>
  );
}
