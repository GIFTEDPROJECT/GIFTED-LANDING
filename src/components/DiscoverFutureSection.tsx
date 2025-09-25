"use client";

import React from "react";
import Link from "next/link";
import styles from "./DiscoverFutureSection.module.scss";

const DiscoverFutureSection = () => {
  return (
    <section className={styles.discoverFutureSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Découvrez l'avenir de GIFTED</h2>
          <p className={styles.description}>
            Explorez nos projets futurs et découvrez comment GIFTED va
            révolutionner l'éducation des enfants.
          </p>
          <Link href="/a-venir" className={styles.discoverButton}>
            Je découvre l'avenir
          </Link>
        </div>
        <div className={styles.visual}>
          <div className={styles.icon}>🚀</div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverFutureSection;
