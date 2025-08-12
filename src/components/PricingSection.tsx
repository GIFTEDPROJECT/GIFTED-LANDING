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
      id: 1,
      type: "confiants",
      icon: "/images/believers.png",
      price: "10 € pour un an",
      originalPrice: "au lieu de 30 €/an",
      features: [
        {
          text: "Abonnement annuel pour 4 parcours d'autonomie",
          included: true,
        },
        {
          text: "Récompenses incluses, sous forme de cadeau choisi par l'enfant",
          included: false,
        },
        {
          text: "Accès à la première économie de partage pour enfants",
          included: false,
        },
        {
          text: "50% à vie sur toutes les fonctionnalités à venir",
          included: false,
        },
        {
          text: "Co-construction de l'appli avec les fondateurs de GIFTED",
          included: false,
        },
        {
          text: "Possibilité de tester nouvelles fonctionnalités en avant-première",
          included: false,
        },
      ],
      availability: "Disponible courant Septembre 2025",
      label: "je dis bye-bye les conflits !",
      url: "https://buy.stripe.com/5kQ4gzb08b9efy5h1u2ZO00",
    },
    /* {
      id: 2,
      type: "SUPPORTERS",
      icon: "/images/supporters.png",
      price: "30 € pour un an",
      originalPrice: "au lieu de 100 €/an à partir de Septembre",
      features: [
        {
          text: "Abonnement annuel pour 4 parcours d'autonomie",
          included: true,
        },
        {
          text: "Récompenses incluses, sous forme de cadeau choisi par l'enfant",
          included: true,
        },
        {
          text: "Accès à la première économie de partage pour enfants",
          included: true,
        },
        {
          text: "50% à vie sur toutes les fonctionnalités à venir",
          included: false,
        },
        {
          text: "Co-construction de l'appli avec les fondateurs de GIFTED",
          included: false,
        },
        {
          text: "Possibilité de tester les nouvelles fonctionnalités en avant-première",
          included: false,
        },
      ],
      availability: "Disponible au printemps 2026",
      label: "Je soutiens !",
      url: "https://buy.stripe.com/00w4gz1py1yE2LjcLe2ZO01",
    },
    {
      id: 3,
      type: "créateurs",
      icon: "/images/founders.png",
      price: "100 € pour un an",
      originalPrice: "50% à vie sur toutes les fonctionnalités",
      features: [
        {
          text: "Abonnement annuel pour 4 parcours d'autonomie",
          included: true,
        },
        {
          text: "Récompenses incluses, sous forme de cadeau choisi par l'enfant",
          included: true,
        },
        {
          text: "Accès à la première économie de partage pour enfants",
          included: true,
        },
        {
          text: "50% à vie sur toutes les fonctionnalités à venir",
          included: true,
        },
        {
          text: "Co-construction de l'appli avec les fondateurs de GIFTED",
          included: true,
        },
        {
          text: "Possibilité de tester les nouvelles fonctionnalités en avant-première",
          included: true,
        },
      ],
      availability: "Disponible au printemps 2026",
      label: "Je crée !",
      url: "https://buy.stripe.com/6oUeVdfgo6SYdpX3aE2ZO02",
    }, */
  ];

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        <div className={styles.badge}>PRÉVENTES ÉTÉ 2025</div>

        <p className={styles.subtitle}>
          ❤️ 10% de votre participation sera reversée à{" "}
          <Image src="/images/dift.webp" width="50" height="20" alt="Dift" />
        </p>
        <h2 className={styles.title}>
          Comment inscrire mon enfant de primaire sur GIFTED ?
        </h2>

        <div className={styles.pricingGrid}>
          {formules.map((formule) => (
            <div
              key={formule.id}
              className={styles.pricingCard}
              data-card-id={formule.id}
            >
              <div className={styles.cardHeader}>
                <div className={styles.typeLabel}>Parents</div>
                <div className={styles.typeButton}>{formule.type}</div>
                <p className={styles.description}>
                  {formule.id === 1 &&
                    "Bénéficiez de 70% de réduction sur l'abonnement annuel aux parcours d'autonomie."}
                  {formule.id === 2 &&
                    "Soyez les pionniers de la première économie de partage pour enfants"}
                  {formule.id === 3 &&
                    "Co-créez avec nous la plus innovante des aventures éducatives."}
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

              <a href={formule.url} target="_blank" rel="noopener noreferrer">
                <button className={styles.ctaButton}>{formule.label}</button>
              </a>
              {/* <button className={styles.ctaButton}>{formule.label}</button> */}

              {expandedCards.includes(formule.id) && (
                <div className={styles.featuresList}>
                  {formule.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`${styles.feature} ${
                        feature.included ? styles.included : styles.notIncluded
                      }`}
                    >
                      <span className={styles.checkmark} />
                      <span className={styles.featureText}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* <button
                className={styles.detailsLink}
                onClick={() => toggleFeatures(formule.id)}
              >
                {expandedCards.includes(formule.id)
                  ? "Masquer les détails"
                  : "Détails de l'offre"}
                <span className={styles.arrow}>
                  {expandedCards.includes(formule.id) ? (
                    <IoChevronUp />
                  ) : (
                    <IoChevronDown />
                  )}
                </span>
              </button> */}
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
