import Hero from "./components/home/Hero";
import TrustStrip from "./components/home/TrustStrip";
import TrustBadges from "./components/home/TrustBadges";
import DestinationsGrid from "./components/home/DestinationsGrid";
import FeaturedPackages from "./components/home/FeaturedPackages";
import WaysToExperience from "./components/home/WaysToExperience";
import WhyFraFri from "./components/home/WhyFraFri";
import Testimonials from "./components/home/Testimonials";
import TravelGuidesTeaser from "./components/home/TravelGuidesTeaser";
import FinalCTA from "./components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
<TrustStrip />
<WhyFraFri />       ← Introduction
<DestinationsGrid />
<FeaturedPackages />
<WaysToExperience />
<Testimonials />
<TravelGuidesTeaser />
<FinalCTA />
    </main>
  );
}