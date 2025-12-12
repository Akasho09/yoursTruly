import "./globals.css";
import { Outfit,} from "next/font/google";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hkusaka",
  openGraph: {
    title: "My OG Title",
    url: "https://sukhlovesakash.vercel.app",
    images: [
      {
        url: "og.png",
        width: 1200,
        height: 630,
        alt: "OG Image Alt Text",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
