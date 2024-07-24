import Footer from "@youmeet/components/Footer";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";
import ProductComponent from "@youmeet/app/le-produit/mise-en-relation/productComponents/ProductComponent";

export default function ProductChild() {
  return (
    <div>
      <BigHeaderSection />
      <ProductComponent />
      <Footer />
    </div>
  );
}
