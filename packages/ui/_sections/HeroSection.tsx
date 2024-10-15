import dynamic from "next/dynamic";
// import DividerSection from "../_components/DividerSection";
import Image from "next/image";

const HeroText = dynamic(() => import("../_components/HeroText"));
// const HeroVideo = dynamic(() => import("../_components/HeroVideo"));

export default function HeroSection() {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col homeLightning relative min-h-[330px]">
      <Image
        role="img"
        width={0}
        height={0}
        title="Un entretien professionnel entre un candidat et une Directrice des Ressources Humaines concluent un contrat d'embaûche en se serrant la main grâce à la mise en relation YouMeet."
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
        loading="eager"
        src="https://res.cloudinary.com/de822mdsy/image/upload/v1704134597/youmeet-official/webp/ywetbtmzpbrzaz2nppqb.webp"
        alt="Un entretien professionnel entre un candidat et une Directrice des Ressources Humaines concluent un contrat d'embaûche en se serrant la main grâce à la mise en relation YouMeet."
      />
      <HeroText />
      {/* <DividerSection type="hero" /> */}
      {/* <HeroVideo /> */}
    </section>
  );
}
