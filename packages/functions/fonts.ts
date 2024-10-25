import { Nunito, Outfit, Indie_Flower } from "next/font/google";

export const nunito = Nunito({
  display: "swap",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});
export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const indie_flower = Indie_Flower({
  variable: "--font-mate",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
