"use client";

import React from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./DonationSection.module.scss";

interface DonationSectionProps {
  id?: string;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ id }) => {
  const sectionRef = useSectionRef(id || "donation");

  return (
    <section ref={sectionRef} id={id} className={styles.donationSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.donationCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>💎</span>
              </div>
              <h2 className={styles.subtitle}>
                Ajoutez votre pierre ( précieuse )<br /> à notre édifice.
              </h2>
              <p className={styles.cardDescription}>
                Grâce à vous, GIFTED pourra réaliser ses promesses plus
                rapidement.
              </p>
            </div>

            <a
              href="https://buy.stripe.com/dRmfZh4BK3GMdpXh1u2ZO04"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.ctaButton}>Je fais un don</button>
            </a>
            <p>
              <span className={styles.infoText}>
                Paiement sécurisé par Stripe
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
