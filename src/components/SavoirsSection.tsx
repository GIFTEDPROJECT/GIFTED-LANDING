"use client";

import React from "react";
import styles from "./SavoirsSection.module.scss";

interface SavoirsSectionProps {
  className?: string;
  id?: string;
}

const savoirs = [
  {
    id: "savoir",
    title: "SAVOIR",
    description:
      "Apprentissage scolaire interactif, ludique et créatif. Approche différenciée très innovante.",
    color: "blue",
    position: "top-left",
  },
  {
    id: "savoir-faire",
    title: "SAVOIR-FAIRE",
    description:
      "Prise en main des outils numériques incontournables. Usage des technologies à bon escient.",
    color: "green",
    position: "top-right",
  },
  {
    id: "savoir-etre",
    title: "SAVOIR-ÊTRE",
    description:
      "Respect de soi, de ses proches, de ses amis, des autres, de l'environnement.",
    color: "purple",
    position: "bottom-left",
  },
  {
    id: "savoir-avoir",
    title: "SAVOIR-AVOIR",
    description:
      "Accès à la première économie de partage pour enfants : Plus écolo, Plus rigolo!",
    color: "yellow",
    position: "bottom-right",
  },
];

export const SavoirsSection: React.FC<SavoirsSectionProps> = ({
  className,
  id,
}) => {
  return (
    <section id={id} className={`${styles.savoirsSection} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          La transmission des savoirs dans GIFTED
        </h2>

        <div className={styles.savoirsGrid}>
          {savoirs.map((savoir, index) => (
            <div
              key={savoir.id}
              className={`${styles.savoirCard} ${styles[savoir.color]} ${
                styles[savoir.position]
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{savoir.title}</h3>
                <p className={styles.cardDescription}>{savoir.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavoirsSection;
