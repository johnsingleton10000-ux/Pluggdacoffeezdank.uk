import { CardWallSection } from "@/components/home/CardWallSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EcosystemLoop } from "@/components/home/EcosystemLoop";
import { FoundationStatus } from "@/components/home/FoundationStatus";
import { HeroSection } from "@/components/home/HeroSection";
import { MembershipPreview } from "@/components/home/MembershipPreview";
import { StorySection } from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <EcosystemLoop />
      <MembershipPreview />
      <CardWallSection />
      <FoundationStatus />
      <ContactSection />
    </main>
  );
}
