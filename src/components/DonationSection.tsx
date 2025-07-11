"use client";

import React from "react";
import styles from "./DonationSection.module.scss";

export const DonationSection: React.FC = () => {
  return (
    <section className={styles.donationSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Soutenez le GIFTED Project <span>🚀</span>
            </h2>
          </div>

          <div className={styles.donationCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>💎</span>
              </div>
              <h2 className={styles.subtitle}>
                Ajoutez votre pierre ( précieuse ) à notre édifice.
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
              <button className={styles.ctaButton}>J&apos;adore !</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
