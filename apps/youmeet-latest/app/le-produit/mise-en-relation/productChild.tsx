import Footer from "@youmeet/ui/Footer";
import BigHeaderSection from "@youmeet/ui/_sections/BigHeaderSection";
import ProductComponent from "@youmeet/ui/le-produit/mise-en-relation/productComponents/ProductComponent";

export default function ProductChild() {
  return (
    <div>
      <BigHeaderSection />
      <ProductComponent />
      <Footer />
    </div>
  );
}
