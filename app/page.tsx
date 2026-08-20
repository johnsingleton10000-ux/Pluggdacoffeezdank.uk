import { Blueprint } from "@/components/foundation/blueprint";
import { EcosystemLoop } from "@/components/foundation/ecosystem-loop";
import { FoundationHero } from "@/components/foundation/hero";
import { MembershipPreview } from "@/components/foundation/membership-preview";
import { SystemContracts } from "@/components/foundation/system-contracts";

export default function HomePage() {
  return (
    <main id="main-content">
      <FoundationHero />
      <EcosystemLoop />
      <Blueprint />
      <MembershipPreview />
      <SystemContracts />
    </main>
  );
}
