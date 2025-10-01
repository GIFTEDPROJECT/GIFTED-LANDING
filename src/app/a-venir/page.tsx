"use client";

import React from "react";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import MethodesSection from "@/components/MethodesSection";
import EtapesCarousel from "@/components/EtapesCarousel";
import ReveSection from "@/components/ReveSection";
import styles from "./page.module.scss";
import SavoirsSection from "@/components/SavoirsSection";

export default function AvenirPage() {
  const handleDiscoverClick = () => {
    // Scroll vers la prochaine section
    const nextSection = document.getElementById("why-children");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Sticky */}
      <StickyHeader />

      <main className={styles.main}>
        {/* Section Pourquoi les enfants adorent GIFTED */}
        {/*  <WhySection type="children" /> */}

        {/* Section Pourquoi les parents adorent GIFTED */}
        {/* <WhySection type="parents" /> */}

        <SavoirsSection id="savoirs" />

        {/* Section Méthodes innovantes de GIFTED */}
        <MethodesSection />

        {/* Carrousel des étapes du GIFTED PROJECT */}
        <EtapesCarousel />

        {/* Section Notre rêve */}
        <ReveSection />
      </main>
    </div>
  );
}
