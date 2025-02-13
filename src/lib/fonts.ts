import { Inter, Bebas_Neue, Roboto_Condensed } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});
