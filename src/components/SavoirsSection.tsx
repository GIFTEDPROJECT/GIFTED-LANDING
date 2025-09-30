"use client";

import React, { useState, useRef } from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./SavoirsSection.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ParcoursModal } from "./Parcours";

interface SavoirsSectionProps {
  className?: string;
  id?: string;
}

const quizCards = [
  {
    id: "hygiene",
    title: "HYGIÈNE",
    description: "« Pour la troisième fois, va te brosser les dents ! »",
    color: "green",
    position: "top-left",
    courseName: "Le Parcours Hygiène",
    question: "Est-ce que tu t'es lavé les dents ce matin ?",
    percentage: "87%",
    beackgroundImlage: "/images/slide1.png",
    slides: [
      {
        image: "/images/slide1.png",
        title: "Apprentissage de l'hygiène",
        description:
          "Découvrez des méthodes ludiques pour enseigner l'hygiène à votre enfant",
      },
      {
        image: "/images/slide2.png",
        title: "Routines quotidiennes",
        description:
          "Créez des routines simples et efficaces pour l'hygiène personnelle",
      },
      {
        image: "/images/slide3.png",
        title: "Motivation et récompenses",
        description:
          "Système de motivation pour encourager les bonnes habitudes",
      },
    ],
  },
  {
    id: "rangement",
    title: "RANGEMENT",
    description: "« Tu as vu l'état de ta chambre !!! »",
    color: "blue",
    position: "top-right",
    courseName: "Le Parcours Rangement",
    question: "As-tu rangé ta chambre aujourd'hui ?",
    percentage: "84%",
    beackgroundImlage: "/images/slide2.png",
    slides: [
      {
        image: "/images/slide2.png",
        title: "Organisation de l'espace",
        description:
          "Apprenez à organiser l'espace de votre enfant de manière efficace",
      },
      {
        image: "/images/slide5.png",
        title: "Méthodes de rangement",
        description: "Techniques simples pour rendre le rangement amusant",
      },
      {
        image: "/images/slide6.png",
        title: "Responsabilisation",
        description:
          "Développez l'autonomie de votre enfant dans l'organisation",
      },
    ],
  },
  {
    id: "respect",
    title: "RESPECT",
    description: "« Non mais, tu parles pas comme ça !!! »",
    color: "purple",
    position: "bottom-left",
    courseName: "Le Parcours Respect",
    question: "As-tu parlé poliment aujourd'hui ?",
    percentage: "64%",
    beackgroundImlage: "/images/slide3.png",
    slides: [
      {
        image: "/images/slide1.png",
        title: "Communication respectueuse",
        description: "Apprenez à communiquer avec respect et bienveillance",
      },
      {
        image: "/images/slide2.png",
        title: "Gestion des émotions",
        description:
          "Aidez votre enfant à gérer ses émotions de manière constructive",
      },
      {
        image: "/images/slide3.png",
        title: "Valeurs et principes",
        description: "Transmettez les valeurs de respect et d'empathie",
      },
    ],
  },
  {
    id: "devoirs",
    title: "DEVOIRS",
    description: "« Allez, montre-moi ton cahier de textes !!! »",
    color: "yellow",
    position: "bottom-right",
    courseName: "Le Parcours Devoirs",
    question: "As-tu fait tes devoirs aujourd'hui ?",
    percentage: "99%",
    beackgroundImlage: "/images/slide4.png",
    slides: [
      {
        image: "/images/slide4.png",
        title: "Organisation du travail",
        description: "Méthodes pour organiser efficacement le temps de travail",
      },
      {
        image: "/images/slide5.png",
        title: "Motivation scolaire",
        description: "Techniques pour motiver votre enfant dans ses études",
      },
      {
        image: "/images/slide6.png",
        title: "Suivi et accompagnement",
        description: "Accompagnez votre enfant dans son parcours scolaire",
      },
    ],
  },
];

export const SavoirsSection: React.FC<SavoirsSectionProps> = ({
  className,
  id,
}) => {
  const sectionRef = useSectionRef(id || "savoirs");
  const swiperRef = useRef<any>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answeredYes, setAnsweredYes] = useState<boolean[]>([]);
  const [visitedCards, setVisitedCards] = useState<string[]>([]);
  const [transformedCards, setTransformedCards] = useState<string[]>([]);
  const [isParcoursModalOpen, setIsParcoursModalOpen] = useState(false);
  const [selectedParcoursId, setSelectedParcoursId] = useState<number>(1);

  const handleCardClick = (cardId: string) => {
    if (openCard === cardId) {
      setOpenCard(null);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
    }
  };

  const handleButtonClick = (cardId: string) => {
    // Transformer la carte
    if (!transformedCards.includes(cardId)) {
      setTransformedCards((prev) => [...prev, cardId]);
    }

    // Afficher le message transformé au centre de l'écran
    setOpenCard(cardId);
    setShowSecondContent(false);
    setCurrentSlide(0);
    setAnsweredYes([]);

    // Après 3 secondes, afficher la popup normale
    setTimeout(() => {
      setShowSecondContent(true);
    }, 3000);

    // Ajouter la carte aux cartes visitées
    if (!visitedCards.includes(cardId)) {
      setVisitedCards((prev) => [...prev, cardId]);
    }
  };

  const handleOverlayClick = () => {
    setOpenCard(null);
    setShowSecondContent(false);
    setCurrentSlide(0);
    setAnsweredYes([]);
  };

  const handleParcoursClick = (parcoursId: number) => {
    setSelectedParcoursId(parcoursId);
    setIsParcoursModalOpen(true);
  };

  const getCurrentCard = () => {
    return quizCards.find((card) => card.id === openCard);
  };

  // Mapping des IDs de cartes vers les IDs de parcours
  const getParcoursIdFromCardId = (cardId: string): number => {
    const mapping: Record<string, number> = {
      hygiene: 1,
      rangement: 2,
      respect: 3,
      devoirs: 4,
    };
    return mapping[cardId] || 1; // Par défaut parcours 1
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.savoirsSection} ${className || ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          Aimeriez-vous arrêter de répéter à votre enfant...?
        </h2>

        <div className={styles.savoirsGrid}>
          {quizCards.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.savoirCard} ${styles[card.color]} ${
                styles[card.position]
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={styles.cardContent}
                onClick={() => handleButtonClick(card.id)}
              >
                <div className={styles.cardBottomSection}>
                  <Image
                    src={card.beackgroundImlage}
                    alt="Projet"
                    width="425"
                    height="239"
                    style={{ width: "100%", height: "auto", opacity: 0.7 }}
                    className={styles.cardImage}
                  />
                  <div
                    className={`${styles.parcoursButton} ${styles[card.color]}`}
                  >
                    <span>Voir le parcours </span>
                    <span>
                      {card.title}
                      <img src="/images/eyes.png" alt="Voir le parcours !" />
                    </span>
                  </div>
                </div>
                <div className={styles.cardTopSection}>
                  <p className={styles.cardQuestion}>{card.description}</p>
                  <div className={styles.cardButtons}>
                    <div className={styles.buttonsContainer}>
                      <button
                        className={styles.cardYesButton}
                        onClick={() => handleButtonClick(card.id)}
                      >
                        OUI
                      </button>
                      <button
                        className={styles.cardNoButton}
                        onClick={() => handleButtonClick(card.id)}
                      >
                        NON
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay pour les cartes ouvertes */}
      {openCard && (
        <div
          className={`${styles.overlay} ${styles[getCurrentCard()!.color]}`}
          onClick={handleOverlayClick}
        >
          <div className={styles.centeredMessage}>
            <img
              src="/images/firework.gif"
              alt="Gifted"
              className={styles.firework}
            />
            <div
              className={`${styles.transformedMessage} ${
                styles[getCurrentCard()!.color]
              }`}
            >
              Laissez Gifted répéter <span>à votre place</span>
            </div>
            <div
              className={styles.buttonTest}
              onClick={() =>
                handleParcoursClick(
                  getParcoursIdFromCardId(getCurrentCard()!.id)
                )
              }
            >
              Je teste !
            </div>
          </div>
        </div>
      )}

      {/* Popin ParcoursModal */}
      <ParcoursModal
        isOpen={isParcoursModalOpen}
        onClose={() => setIsParcoursModalOpen(false)}
        parcoursId={selectedParcoursId}
      />
    </section>
  );
};

export default SavoirsSection;
