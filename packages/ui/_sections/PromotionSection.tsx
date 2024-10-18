import HomeCV from "../_homeComponents/HomeCV";
import HomeVideo from "../_homeComponents/HomeVideo";

export default function PromotionSection() {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col">
      <HomeCV />
      <HomeVideo />
    </section>
  );
}
