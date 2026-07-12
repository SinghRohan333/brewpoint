import Hero from "@/components/home/Hero";
import RoastDivider from "@/components/layout/RoastDivider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <RoastDivider />
      <FeaturedProducts />
      <Categories />
      <HowItWorks />
      <Stats />
    </main>
  );
}
