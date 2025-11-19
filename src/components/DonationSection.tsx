"use client";

import React from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./DonationSection.module.scss";
import Image from "next/image";

interface DonationSectionProps {
  id?: string;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ id }) => {
  const sectionRef = useSectionRef(id || "donation");

  return (
    <section ref={sectionRef} id={id} className={styles.donationSection}>
      <div className={styles.container}>
        <div className={styles.badge}>PRÉVENTES 2025</div>
        <h2 className={styles.subtitle}>
          Dîtes bye-bye aux conflits et welcome au bonheur en famille
        </h2>
        <div className={styles.content}>
          <div className={styles.donationCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <img src="/images/logo_mymoojo.png" alt="My Moojo" />
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.price}>
                  à partir de 10 € pour un an
                  <sup>*</sup>
                </div>
                <div className={styles.originalPrice}>
                  au lieu de 30 euros par an hors préventes
                </div>
              </div>
              <div className={styles.featuresList}>
                <div className={`${styles.feature} ${styles.included}`}>
                  <span className={styles.featureText}>
                    👉 Inscrivez-vous dès maintenant pour être informé du
                    lancement des préventes le 1er décembre.
                  </span>
                </div>
              </div>
            </div>

            <a
              className={styles.ctaButton}
              href="https://app.mymoojo.com/project/gifted"
              target="_blank"
              rel="noopener noreferrer"
            >
              Je m'inscris aux préventes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
