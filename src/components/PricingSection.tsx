"use client";

import React, { useState } from "react";
import styles from "./PricingSection.module.scss";
import Image from "next/image";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export const PricingSection: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleFeatures = (cardId: number) => {
    const wasExpanded = expandedCards.includes(cardId);

    setExpandedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );

    // Si on ouvre la liste (et qu'elle n'était pas ouverte avant)
    if (!wasExpanded) {
      // Attendre que le DOM soit mis à jour
      setTimeout(() => {
        const featuresList = document.querySelector(
          `[data-card-id="${cardId}"] .${styles.featuresList}`
        );
        if (featuresList) {
          featuresList.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // Si on ferme la liste, scroll vers le haut de la carte
      setTimeout(() => {
        const card = document.querySelector(`[data-card-id="${cardId}"]`);
        if (card) {
          card.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  const formules = [
    {
      id: 2,
      icon: "/images/believers.png",
      price: "10 € pour un an",
      originalPrice: "au lieu de 30 €/an à partir de Septembre",
      features: [
        {
          text: "Abonnement ANNUEL aux 4 parcours d’autonomie (hygiène, rangement, respect, devoirs)",
          included: true,
        },
        {
          text: "Avatars personnalisables et évolutifs",
          included: true,
        },
        {
          text: `Possibilité de Co-Création avec les fondateurs de GIFTED:
          <ul>
            <li>Choix des “récompenses” pour les enfants</li>
            <li>Création du prochain parcours : le “Parcours Ecrans”</li>
            <li>Et de toutes les fonctionnalités à venir</li>
          </ul>
`,
          included: true,
        },
      ],
      availability: "Disponible courant Septembre 2025",
      label: "Je m'inscris",
      url: "https://buy.stripe.com/5kQ4gzb08b9efy5h1u2ZO00",
    },
  ];

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        <div className={styles.badge}>PRÉVENTES 2025</div>

        <h2 className={styles.title}>
          Rendez vos enfants autonomes en 5 min de FUN par jour!
        </h2>
        <p className={styles.subtitle}>
          L’application sera disponible fin 2025.
        </p>
        <p className={styles.subtitle}>
          ❤️ 10% de votre participation sera reversée à{" "}
          <Image src="/images/dift.webp" width="50" height="20" alt="Dift" />
        </p>

        <div className={styles.pricingGrid}>
          {formules.map((formule) => (
            <div
              key={formule.id}
              className={styles.pricingCard}
              data-card-id={formule.id}
            >
              <div className={styles.cardHeader}>
                <p className={styles.description}>
                  {formule.id === 1 && "Testez avant de vous engager"}
                  {formule.id === 2 &&
                    "Dites bye-bye aux conflits et Welcome au bonheur en famille"}
                </p>
              </div>

              <div className={styles.priceContainer}>
                <div className={styles.price}>
                  {formule.price}
                  <sup>*</sup>
                </div>
                <div className={styles.originalPrice}>
                  {formule.originalPrice}
                </div>
              </div>
              <div className={styles.featuresList}>
                {formule.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`${styles.feature} ${
                      feature.included ? styles.included : styles.notIncluded
                    }`}
                  >
                    <span className={styles.checkmark} />
                    <span
                      className={styles.featureText}
                      dangerouslySetInnerHTML={{ __html: feature.text }}
                    />
                  </div>
                ))}
              </div>

              <a href={formule.url} target="_blank" rel="noopener noreferrer">
                <button className={styles.ctaButton}>{formule.label}</button>
              </a>
              <p>Disponible avant fin 2025</p>
            </div>
          ))}
        </div>
      </div>
      <p className={styles.consents}>
        * Offre pour 12 mois, sans engagement pour l&apos;année suivante.
      </p>
    </section>
  );
};

export default PricingSection;
