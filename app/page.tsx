import About from "@/components/widgets/About";
import Brands from "@/components/widgets/Brands";
import FAQ from "@/components/widgets/FAQ";
import Hero from "@/components/widgets/Hero";
import ProductCategory from "@/components/widgets/ProductCategory";
import Why from "@/components/widgets/Why";

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <About />
      <ProductCategory />
      <Why />
      <FAQ />
    </main>
  );
}
