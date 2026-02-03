import { Headline } from "./home page/headline";
import { HowItWorks } from "./home page/HowItWorks";
import { TrustSection } from "./home page/TrustSection";
import { AudienceSection } from "./home page/AudienceSection";
import { CTASection } from "./home page/CTASection";
import { useFadeInOnScroll } from "./home page/useFadeInOnScroll";

export function Home() {
  useFadeInOnScroll(); // trigger fade-in on scroll

  return (
    <>
      <Headline />
      <HowItWorks />
      <TrustSection />
      <AudienceSection />
      <CTASection />
    </>
  );
}
