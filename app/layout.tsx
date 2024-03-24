import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lirik Musik Online",
  description:
    "Sebuah website yang dapat anda gunakan untuk mencari lirik lagu dengan mudah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={gabarito.className}>{children}</body>
    </html>
  );
}
