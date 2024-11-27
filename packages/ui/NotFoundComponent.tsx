import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";

const NotFoundChild = dynamic(() => import("@youmeet/ui/NotFoundChild"));

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col h-screen">
      <NotFoundChild />
      <Footer />
    </div>
  );
}
