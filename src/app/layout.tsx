import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MyTools from "@/lib/client/mytools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TmDB",
  description: "Tyler's Movie Database | IMDB Clone",
  openGraph: {
    images: [
      MyTools.getPosterUrl("/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg", "original"),
      MyTools.getPosterUrl("/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", "original"),
      MyTools.getPosterUrl("/6YwkGolwdOMNpbTOmLjoehlVWs5.jpg", "original"),
    ],
    authors: "Tyler Bert Baring",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
