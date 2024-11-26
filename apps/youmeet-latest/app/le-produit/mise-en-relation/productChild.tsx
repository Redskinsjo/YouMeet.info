import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSectionChild")
);
const ProductComponent = dynamic(
  () => import("@youmeet/ui/productComponents/ProductChild")
);

export default function ProductChild() {
  return (
    <div>
      <BigHeaderSection />
      <ProductComponent />
      <Footer />
    </div>
  );
}
