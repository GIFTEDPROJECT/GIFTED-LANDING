"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import DoubleHeroSection from "@/components/DoubleHeroSection";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import AutonomieSection from "@/components/AutonomieSection";
import MethodesSection from "@/components/MethodesSection";
import EtapesCarousel from "@/components/EtapesCarousel";
import ReveSection from "@/components/ReveSection";
import PricingSection from "@/components/PricingSection";
import DonationSection from "@/components/DonationSection";
import ContactSection from "@/components/ContactSection";
import DiscoverFutureSection from "@/components/DiscoverFutureSection";
import StickyHeader from "@/components/StickyHeader";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import { RevealSection } from "@/components/RevealSection";
import styles from "./page.module.scss";
import { MethodSection } from "@/components";

export default function Home() {
  const handleDiscoverClick = () => {
    // Scroll vers la prochaine section du site one-page
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Sticky */}
      <StickyHeader />

      {/* Navigation horizontale */}
      <HorizontalNavigation />

      {/* Double Hero Section - Premier écran */}
      <DoubleHeroSection />

      {/* Section Dr Eve Bottach - À quoi sert GIFTED */}
      <AboutSection id="about" />

      {/* Section La transmission des savoirs dans GIFTED */}
      <AutonomieSection id="savoirs" />

      {/* Section Méthodes innovantes de GIFTED */}
      <MethodSection id="method" />

      {/* Hero Section - Deuxième écran */}
      {/*  <HeroSection
        title="Et si l'Enfance recréait le Monde ?"
        ctaText="JE DÉCOUVRE"
        onCtaClick={handleDiscoverClick}
      /> */}

      {/* Section Pourquoi les enfants adorent GIFTED */}
      {/* <WhySection type="children" /> */}

      {/* Section Pourquoi les parents adorent GIFTED */}
      {/* <WhySection type="parents" /> */}

      {/* Section Révélation des phrases */}
      <RevealSection id="reveal" />

      {/* Section Méthodes innovantes de GIFTED */}
      {/*  <MethodesSection /> */}

      {/* Carrousel des étapes du GIFTED PROJECT */}
      {/* <EtapesCarousel /> */}

      {/* Section Notre rêve */}
      {/* <ReveSection /> */}

      {/* Section Pricing/Soutien */}
      <PricingSection id="pricing" />

      {/* Section Don */}
      {/* <DonationSection id="donation" /> */}

      {/* Section Contact/email */}
      <ContactSection id="contact" />

      {/* Section Découvrir l'avenir */}
      <DiscoverFutureSection id="discover-future" />
    </div>
  );
}
