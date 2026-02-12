import { Headline } from "./home page/headline";
import { FeaturesSection } from "./home page/FeaturesSection";
import { HowItWorks } from "./home page/HowItWorks";
import { TrustSection } from "./home page/TrustSection";
import { AudienceSection } from "./home page/AudienceSection";
import { CTASection } from "./home page/CTASection";
import { Footer } from "./home page/Footer";
import { useFadeInOnScroll } from "./home page/useFadeInOnScroll";

export function Home() {
  useFadeInOnScroll(); // trigger fade-in on scroll

  return (
    <>
      <Headline />
      <FeaturesSection />
      <HowItWorks />
      <TrustSection />
      <AudienceSection />
      <CTASection />
      <Footer />
    </>
  );
}
