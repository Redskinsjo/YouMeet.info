"use client";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

const types = {
  definition: {
    sizes: { lg: { width: 600, height: 400 }, sm: { width: 350, height: 233 } },
    alt: "un ordinateur, une tasse de café et des écouteurs: un moment de concentration stimulant",
    title:
      "un ordinateur, une tasse de café et des écouteurs: un moment de concentration stimulant",
    src: "https://res.cloudinary.com/de822mdsy/image/upload/v1703466574/youmeet-official/webp/zw6x9d9ndusi4elg7fpn.webp",
  },
  importance: {
    sizes: { lg: { width: 616, height: 400 }, sm: { width: 350, height: 199 } },
    alt: "un diamant de qualité maximale et un fond noir",
    title: "un diamant de qualité maximale et un fond noir",
    src: `https://res.cloudinary.com/de822mdsy/image/upload/v1703428788/youmeet-official/webp/saagimmp070kwtq2whev.webp`,
  },
  development: {
    sizes: { lg: { width: 600, height: 400 }, sm: { width: 350, height: 233 } },
    alt: "Des dés représentant quatre symboles de communication, le téléphone, l'enveloppe e-mail, l'arobase et le smartphone",
    title:
      "Des dés représentant quatre symboles de communication, le téléphone, l'enveloppe e-mail, l'arobase et le smartphone",
    src: `https://res.cloudinary.com/de822mdsy/image/upload/v1699527982/youmeet-official/webp/marketing-card-search_g0ki4s.webp`,
  },
  examples: {
    sizes: { lg: { width: 618, height: 400 }, sm: { width: 350, height: 227 } },
    alt: "make it: great, big, work, awesome, strength, powerful",
    title: "make it: great, big, work, awesome, strength, powerful",
    src: `https://res.cloudinary.com/de822mdsy/image/upload/v1703426570/youmeet-official/webp/ejsuoits52qn4miqemhl.webp`,
  },
};

export default function CompetencyImg({
  type,
}: {
  type: "definition" | "importance" | "development" | "examples";
}) {
  const xs = useMediaQuery("(max-width: 600px)");
  const sm = useMediaQuery("(max-width: 720px)");

  return (
    <div className="flex-1 flex justify-end">
      <Image
        width={
          xs || sm ? types[type].sizes.sm.width : types[type].sizes.lg.width
        }
        height={
          xs || sm ? types[type].sizes.sm.height : types[type].sizes.lg.height
        }
        alt={types[type].alt}
        src={types[type].src}
      />
    </div>
  );
}
