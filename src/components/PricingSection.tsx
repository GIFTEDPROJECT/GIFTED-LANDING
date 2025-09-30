"use client";

import React, { useState } from "react";
import styles from "./PricingSection.module.scss";
import Image from "next/image";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ParcoursModal } from "./Parcours/ParcoursModal";

interface PricingSectionProps {
  id?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ id }) => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isParcoursModalOpen, setIsParcoursModalOpen] = useState(false);
  const [selectedParcoursId, setSelectedParcoursId] = useState<number>(1);

  const handleTestGratuit = () => {
    setSelectedParcoursId(1); // Parcours hygiène par défaut
    setIsParcoursModalOpen(true);
  };

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
      icon: "/images/pricing-card1.png",
      price: "Test gratuit",
      originalPrice: "",
      features: [
        {
          text: "Testez dès maintenant nos 4 parcours d'autonomie",
          included: true,
        },
        {
          text: "Hygiène, rangement, respect, devoirs",
          included: true,
        },
      ],
      availability: "Disponible avant fin 2025",
      label: "Je teste gratuitement",
      url: "https://buy.stripe.com/5kQ4gzb08b9efy5h1u2ZO00",
    },
    {
      id: 2,
      icon: "/images/pricing-card2.png",
      price: "10 € pour un an",
      originalPrice: "au lieu de 30 €/an début 2026",
      features: [
        {
          text: "Abonnement ANNUEL aux 4 parcours d'autonomie (hygiène, rangement, respect, devoirs)",
          included: true,
        },
        {
          text: "Avatars personnalisables et évolutifs",
          included: true,
        },
        {
          text: `Possibilité de Co-Création avec les fondateurs de GIFTED:
          <ul>
            <li>Choix des "récompenses" pour les enfants</li>
            <li>Création du prochain parcours : le "Parcours Ecrans"</li>
            <li>Et de toutes les fonctionnalités à venir</li>
          </ul>
`,
          included: true,
        },
      ],
      availability: "Disponible début 2026",
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
                <div className={styles.iconContainer}>
                  <Image
                    src={formule.icon}
                    alt={formule.id.toString()}
                    width={100}
                    height={100}
                  />
                </div>
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

              <button
                className={styles.ctaButton}
                onClick={() => {
                  if (formule.id === 1) {
                    // Pour le test gratuit, ouvrir le parcours
                    handleTestGratuit();
                  } else {
                    // Pour l'abonnement, rediriger vers contact
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                      // Fallback : chercher par classe CSS
                      const contactElement =
                        document.querySelector(".contactSection");
                      if (contactElement) {
                        contactElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                }}
              >
                {formule.label}
              </button>
              <p>{formule.availability}</p>
            </div>
          ))}
        </div>
      </div>
      <p className={styles.consents}>
        * Offre pour 12 mois, sans engagement pour l&apos;année suivante.
      </p>

      {/* Modal Parcours */}
      <ParcoursModal
        isOpen={isParcoursModalOpen}
        onClose={() => setIsParcoursModalOpen(false)}
        parcoursId={selectedParcoursId}
      />
    </section>
  );
};

export default PricingSection;
