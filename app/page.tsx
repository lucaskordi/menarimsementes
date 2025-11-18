import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/about-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { TsiSection } from "@/components/tsi-section";
import { ResultadosSection } from "@/components/resultados-section";
import { SeedToHarvestSection } from "@/components/seed-to-harvest-section";
import { ParceirosSection } from "@/components/parceiros-section";
import { ContatoSection } from "@/components/contato-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <AboutSection />
        <PortfolioSection />
        <TsiSection />
        <ResultadosSection />
        <SeedToHarvestSection />
        <ParceirosSection />
        <ContatoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

