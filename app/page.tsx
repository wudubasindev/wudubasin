import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ProductSpecs } from "./components/ProductSpecs";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Pricing } from "./components/Pricing";
import { Gallery } from "./components/Gallery";
import { FAQ } from "./components/FAQ";
import { BookingSection } from "./components/BookingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ProductSpecs />
      <WhyChooseUs />
      <Pricing />
      <Gallery />
      <FAQ />
      <BookingSection />
    </>
  );
}
