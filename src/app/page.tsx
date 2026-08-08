import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/landing/Hero";
import { ProductIntro } from "@/components/landing/ProductIntro";
import { JourneyVisualization } from "@/components/landing/JourneyVisualization";
import { BuildProveShare } from "@/components/landing/BuildProveShare";
import { DayPreview } from "@/components/landing/DayPreview";
import { Benefits } from "@/components/landing/Benefits";
import { StreakStory } from "@/components/landing/StreakStory";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="container" style={{ minHeight: "auto" }}>
        <main>
          <Hero />
          <ProductIntro />
        </main>
      </div>
      
      {/* 
        Full width components or components that handle their own 
        container logic / bleeding background 
      */}
      <div className="container" style={{ minHeight: "auto" }}>
        <JourneyVisualization />
        <BuildProveShare />
        <DayPreview />
        <Benefits />
        <StreakStory />
        <FinalCTA />
      </div>
    </>
  );
}
