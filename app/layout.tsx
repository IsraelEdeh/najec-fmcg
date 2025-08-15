import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/widgets/Navbar";
import Footer from "@/components/widgets/Footer";
import QueryClientProviderContainer from "@/components/widgets/QueryClientProviderContainer";

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
        <QueryClientProviderContainer>
          <Navbar />
          {children}
          <Footer />
        </QueryClientProviderContainer>
      </body>
    </html>
  );
}
