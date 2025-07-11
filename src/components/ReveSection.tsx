"use client";

import React from "react";
import styles from "./ReveSection.module.scss";
import Image from "next/image";

export const ReveSection: React.FC = () => {
  const bulles = [
    { id: 1, text: "des êtres libres", position: "top-left" },
    { id: 2, text: "responsables", position: "top-center" },
    { id: 3, text: "autonomes", position: "top-right" },
    { id: 4, text: "qui partagent", position: "bottom-left" },
    { id: 5, text: "qui entreprennent", position: "bottom-center" },
  ];

  return (
    <section className={styles.reveSection}>
      <div className={styles.backgroundImage}>
        <Image
          src="/images/dream-bg.png"
          alt="Paysage naturel avec coucher de soleil"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className={styles.container}>
        <h2 className={styles.title}>Notre rêve?</h2>
        <p className={styles.subtitle}>
          Aider la jeune génération à devenir...
        </p>

        <div className={styles.bullesContainer}>
          {bulles.map((bulle) => (
            <div
              key={bulle.id}
              className={`${styles.bulle} ${styles[bulle.position]}`}
            >
              <div className={styles.bulleContent}>{bulle.text}</div>
            </div>
          ))}
        </div>

        <p className={styles.conclusion}>
          pour recréer le Monde... en bien... en bien mieux...
        </p>
      </div>
    </section>
  );
};

export default ReveSection;
