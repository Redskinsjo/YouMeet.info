import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection"),
  { ssr: false }
);
const ProductComponent = dynamic(
  () =>
    import(
      "@youmeet/ui/le-produit/mise-en-relation/productComponents/ProductComponent"
    ),
  { ssr: false }
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
