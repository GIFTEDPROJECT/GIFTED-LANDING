"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import SavoirsSection from "@/components/SavoirsSection";
import MethodesSection from "@/components/MethodesSection";
import EtapesCarousel from "@/components/EtapesCarousel";
import ReveSection from "@/components/ReveSection";
import PricingSection from "@/components/PricingSection";
import DonationSection from "@/components/DonationSection";
import ContactSection from "@/components/ContactSection";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import styles from "./page.module.scss";

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

      {/* Hero Section - Premier écran */}
      <HeroSection
        title="Et si l'Enfance recréait le Monde ?"
        ctaText="JE DÉCOUVRE"
        onCtaClick={handleDiscoverClick}
      />

      {/* Section Dr Eve Bottach - À quoi sert GIFTED */}
      <AboutSection id="about" />

      {/* Section Pourquoi les enfants adorent GIFTED */}
      <WhySection type="children" />

      {/* Section Pourquoi les parents adorent GIFTED */}
      <WhySection type="parents" />

      {/* Section La transmission des savoirs dans GIFTED */}
      <SavoirsSection id="savoirs" />

      {/* Section Méthodes innovantes de GIFTED */}
      <MethodesSection />

      {/* Carrousel des étapes du GIFTED PROJECT */}
      <EtapesCarousel />

      {/* Section Notre rêve */}
      <ReveSection />

      {/* Section Pricing/Soutien */}
      <PricingSection />

      {/* Section Don */}
      <DonationSection />

      {/* Section Contact/email */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
