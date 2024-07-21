import { Nunito, Outfit, Mate_SC, Comfortaa } from "next/font/google";

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
export const mate = Mate_SC({
  variable: "--font-mate",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const comfortaa = Comfortaa({
  variable: "--font-mate",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
