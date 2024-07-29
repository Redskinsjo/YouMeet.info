import Footer from "@youmeet/components/Footer";
import BigHeaderSection from "@youmeet/components/_sections/BigHeaderSection";
import ProductComponent from "@youmeet/components/le-produit/mise-en-relation/productComponents/ProductComponent";

export default function ProductChild() {
  return (
    <div>
      <BigHeaderSection />
      <ProductComponent />
      <Footer />
    </div>
  );
}
