"use client";

import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Et si l'Enfance recréait le Monde ?",
  subtitle = "",
  ctaText = "JE DÉCOUVRE",
  onCtaClick,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        {/* Cadeaux flottants */}
        <div className={styles.floatingGifts}>
          <div className={`${styles.gift} ${styles.gift1}`}>
            <Image
              src="/images/gift.png"
              alt="Cadeau flottant"
              width={60}
              height={60}
              className={styles.giftImage}
            />
          </div>
          <div className={`${styles.gift} ${styles.gift2}`}>
            <Image
              src="/images/gift.png"
              alt="Cadeau flottant"
              width={45}
              height={45}
              className={styles.giftImage}
            />
          </div>
          <div className={`${styles.gift} ${styles.gift3}`}>
            <Image
              src="/images/gift.png"
              alt="Cadeau flottant"
              width={70}
              height={70}
              className={styles.giftImage}
            />
          </div>
        </div>

        {/* Logo GIFTED */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image
              src="/images/rounded-logo.png"
              alt="GIFTED Logo"
              width={280}
              height={100}
              className={styles.logoImage}
              priority
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} data-text={title}>
            {title}
          </h1>
          {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}

          <button className={styles.ctaButton} onClick={onCtaClick}>
            <span className={styles.ctaText}>{ctaText}</span>
          </button>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.womanImage}>
          <Image src="/images/woman.png" alt="Woman" width={250} height={400} />
        </div>
        <div className={styles.manImage}>
          <Image src="/images/man.png" alt="Woman" width={250} height={400} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
