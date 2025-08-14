import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/widgets/Navbar";

export const metadata: Metadata = {
  title: "NAJEC FMCG",
  description:
    "NAJEC FMCG is a leading distributor of fast-moving consumer goods in Nigeria, providing a wide range of products to meet the needs of retailers and consumers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
