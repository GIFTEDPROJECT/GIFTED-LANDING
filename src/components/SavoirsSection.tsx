"use client";

import React, { useState } from "react";
import styles from "./SavoirsSection.module.scss";
import Image from "next/image";

interface SavoirsSectionProps {
  className?: string;
  id?: string;
}

const quizCards = [
  {
    id: "hygiene",
    title: "HYGIÈNE",
    description: "Pour la troisième fois, va te brosser les...",
    color: "green",
    position: "top-left",
    courseName: "Le Parcours Hygiène",
    question: "Est-ce que tu t'es lavé les dents ce matin ?",
    percentage: "87%",
  },
  {
    id: "rangement",
    title: "RANGEMENT",
    description: "Tu as vu l'état de ta chambre !!!",
    color: "blue",
    position: "top-right",
    courseName: "Le Parcours Rangement",
    question: "As-tu rangé ta chambre aujourd'hui ?",
    percentage: "84%",
  },
  {
    id: "respect",
    title: "RESPECT",
    description: "Non mais, tu parles pas comme ça !!!",
    color: "purple",
    position: "bottom-left",
    courseName: "Le Parcours Respect",
    question: "As-tu parlé poliment aujourd'hui ?",
    percentage: "64%",
  },
  {
    id: "devoirs",
    title: "DEVOIRS",
    description: "Allez, montre-moi ton cahier de textes !!!",
    color: "yellow",
    position: "bottom-right",
    courseName: "Le Parcours Devoirs",
    question: "As-tu fait tes devoirs aujourd'hui ?",
    percentage: "99%",
  },
];

export const SavoirsSection: React.FC<SavoirsSectionProps> = ({
  className,
  id,
}) => {
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answeredYes, setAnsweredYes] = useState<boolean[]>([]);
  const [visitedCards, setVisitedCards] = useState<string[]>([]);
  const [showPercentageBanner, setShowPercentageBanner] = useState(false);
  const [percentageResponse, setPercentageResponse] = useState<string>("");
  const [percentageValue, setPercentageValue] = useState<string>("");
  const [activeCardId, setActiveCardId] = useState<string>("");
  const [isBannerTransitioning, setIsBannerTransitioning] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [responseType, setResponseType] = useState<"oui" | "non" | null>(null);

  const clearCurrentBanner = () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(null);
    }
    const banner = document.querySelector(
      `.${styles.percentageBanner}`
    ) as HTMLElement;
    if (banner) {
      banner.classList.add(styles.slideDown);
      setTimeout(() => {
        setShowPercentageBanner(false);
      }, 300);
    }
  };

  const showNewBanner = (
    cardId: string,
    response: string,
    percentage: string,
    type: "oui" | "non"
  ) => {
    setActiveCardId(cardId);
    setPercentageResponse(response);
    setPercentageValue(percentage);
    setResponseType(type);
    setShowPercentageBanner(true);

    // Programmer la disparition automatique
    const timeout = setTimeout(() => {
      const banner = document.querySelector(
        `.${styles.percentageBanner}`
      ) as HTMLElement;
      if (banner) {
        banner.classList.add(styles.slideDown);
        setTimeout(() => {
          setShowPercentageBanner(false);
        }, 300);
      }
    }, 5000);

    setCurrentTimeout(timeout);
  };

  const handleCardClick = (cardId: string) => {
    // Ne pas ouvrir la popin si le bandeau est affiché
    if (showPercentageBanner) {
      return;
    }

    if (openCard === cardId) {
      setOpenCard(null);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
    } else {
      setOpenCard(cardId);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
      // Ajouter la carte aux cartes visitées
      if (!visitedCards.includes(cardId)) {
        setVisitedCards((prev) => [...prev, cardId]);
      }
    }
  };

  const handleOverlayClick = () => {
    setOpenCard(null);
    setShowSecondContent(false);
    setCurrentSlide(0);
    setAnsweredYes([]);
  };

  const handleYesClick = (cardId: string) => {
    // Fermer la popin si elle est ouverte
    if (openCard) {
      setOpenCard(null);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
    }

    const card = quizCards.find((c) => c.id === cardId);
    if (card) {
      // Si une bannière est déjà affichée, la faire sortir d'abord
      if (showPercentageBanner) {
        clearCurrentBanner();
        setTimeout(() => {
          showNewBanner(
            cardId,
            "des parents ont répondu OUI",
            card.percentage,
            "oui"
          );
        }, 400); // Attendre que la sortie soit terminée
      } else {
        // Première bannière
        showNewBanner(
          cardId,
          "des parents ont répondu OUI",
          card.percentage,
          "oui"
        );
      }
    }
  };

  const handleNoClick = (cardId: string) => {
    // Fermer la popin si elle est ouverte
    if (openCard) {
      setOpenCard(null);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
    }

    const card = quizCards.find((c) => c.id === cardId);
    if (card) {
      // Si une bannière est déjà affichée, la faire sortir d'abord
      if (showPercentageBanner) {
        clearCurrentBanner();
        setTimeout(() => {
          showNewBanner(
            cardId,
            "des parents ont répondu NON",
            `${100 - parseInt(card.percentage)}%`,
            "non"
          );
        }, 400); // Attendre que la sortie soit terminée
      } else {
        // Première bannière
        showNewBanner(
          cardId,
          "des parents ont répondu NON",
          `${100 - parseInt(card.percentage)}%`,
          "non"
        );
      }
    }
  };

  const getCurrentCard = () => {
    return quizCards.find((card) => card.id === openCard);
  };

  return (
    <section id={id} className={`${styles.savoirsSection} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Les parcours d'autonomie</h2>
        <h3 className={styles.subtitle}>
          Aimeriez-vous arrêter de répéter à votre enfant...?
        </h3>

        <div className={styles.savoirsGrid}>
          {quizCards.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.savoirCard} ${styles[card.color]} ${
                styles[card.position]
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.quizLabel}>{card.title}</div>
              <div className={styles.cardContent}>
                <div className={styles.cardBottomSection}>
                  <Image
                    src="/images/project1.png"
                    alt="Projet"
                    width="425"
                    height="239"
                    style={{ width: "100%", height: "auto" }}
                    className={styles.cardImage}
                  />
                  <button className={styles.cardDiscoverButton}>
                    DÉCOUVRIR
                  </button>
                </div>
                <div className={styles.cardTopSection}>
                  <p className={styles.cardIntro}>Répétez-vous souvent ?</p>
                  <p className={styles.cardQuestion}>{card.description}</p>
                  <div className={styles.cardButtons}>
                    <button
                      className={styles.cardYesButton}
                      onClick={() => handleYesClick(card.id)}
                    >
                      OUI
                    </button>
                    <button
                      className={styles.cardNoButton}
                      onClick={() => handleNoClick(card.id)}
                    >
                      NON
                    </button>
                  </div>
                </div>
                {visitedCards.includes(card.id) && (
                  <div className={styles.cardCheckIcon}>✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay pour les cartes ouvertes */}
      {openCard && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div
              className={`${styles.popupContent} ${
                styles[getCurrentCard()!.id]
              }`}
            >
              {/* Contenu principal - Parcours spécifique */}
              <div
                className={`${styles.mainContent} ${
                  showSecondContent ? styles.slideOut : ""
                }`}
              >
                <button
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCard(null);
                    setShowSecondContent(false);
                    setCurrentSlide(0);
                    setAnsweredYes([]);
                    setVisitedCards((prev) =>
                      prev.filter((card) => card !== openCard)
                    );
                  }}
                >
                  <img src="/images/popin-close-btn.png" alt="Fermer" />
                </button>
                <div className={styles.popupHeader}>
                  <div className={styles.birdImage}></div>
                  <h3 className={styles.popupHeaderTitle}>
                    {getCurrentCard()?.courseName}
                  </h3>
                  <p className={styles.popupHeaderSubtitle}>
                    {getCurrentCard()?.percentage} des parents affirment
                    rencontrer ce type de conflits quotidiens.
                  </p>
                </div>
                <div className={styles.content}>
                  <p className={styles.popupDescription}>
                    Découvrez un aperçu du parcours{" "}
                    {getCurrentCard()?.title?.toLowerCase()} et laissez Gifted
                    répéter à votre place !
                  </p>
                  <button
                    className={styles.discoverButton}
                    onClick={() => setShowSecondContent(true)}
                  >
                    Je découvre
                  </button>
                </div>
              </div>

              {/* Troisième contenu - Slides spécifiques */}
              <div
                className={`${styles.thirdContent} ${
                  showSecondContent ? styles.slideIn : ""
                }`}
              >
                {/* Slide 1 */}
                <div
                  className={`${styles.slide} ${
                    currentSlide === 0 ? styles.active : ""
                  }`}
                >
                  <h3 className={styles.popupTitle}>
                    {getCurrentCard()?.question}
                  </h3>
                  <div className={styles.rotatingCircle}></div>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.yesButton}
                      onClick={() => handleYesClick(openCard!)}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => handleNoClick(openCard!)}
                    >
                      Non
                    </button>
                  </div>
                </div>

                {/* Slide 2 */}
                <div
                  className={`${styles.slide} ${
                    currentSlide === 1 ? styles.active : ""
                  }`}
                >
                  <h3 className={styles.popupTitle}>
                    As-tu respecté les règles aujourd'hui ?
                  </h3>
                  <div className={styles.rotatingCircle}></div>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.yesButton}
                      onClick={() => handleYesClick(openCard!)}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => handleNoClick(openCard!)}
                    >
                      Non
                    </button>
                  </div>
                </div>

                {/* Slide 3 */}
                <div
                  className={`${styles.slide} ${
                    currentSlide === 2 ? styles.active : ""
                  }`}
                >
                  <h3 className={styles.popupTitle}>
                    As-tu aidé quelqu'un aujourd'hui ?
                  </h3>
                  <div className={styles.rotatingCircle}></div>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.yesButton}
                      onClick={() => handleYesClick(openCard!)}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => handleNoClick(openCard!)}
                    >
                      Non
                    </button>
                  </div>
                </div>

                {/* Slide 4 */}
                <div
                  className={`${styles.slide} ${
                    currentSlide === 3 ? styles.active : ""
                  }`}
                >
                  <h3 className={styles.popupTitle}>
                    As-tu été responsable aujourd'hui ?
                  </h3>
                  <div className={styles.rotatingCircle}></div>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.yesButton}
                      onClick={() => handleYesClick(openCard!)}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => handleNoClick(openCard!)}
                    >
                      Non
                    </button>
                  </div>
                </div>

                {/* Slide 5 - Félicitations */}
                <div
                  className={`${styles.slide} ${
                    currentSlide === 4 ? styles.active : ""
                  }`}
                >
                  <h3 className={styles.popupTitle}>Bravo ! 🎉</h3>
                  <p className={styles.popupDescription}>
                    Tu as répondu à toutes les questions. Tes parents vont
                    désormais valider tes réponses pour que tu puisses récupérer
                    tes gift points !
                  </p>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.discoverButton}
                      onClick={() => {
                        setOpenCard(null);
                        setShowSecondContent(false);
                        setCurrentSlide(0);
                        setAnsweredYes([]);
                      }}
                    >
                      Terminer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments fixes qui s'allument progressivement */}
            {showSecondContent && currentSlide < 4 && (
              <div className={styles.elementsContainer}>
                <div
                  className={`${styles.element} ${
                    currentSlide >= 1 && answeredYes[0] === true
                      ? styles.active
                      : ""
                  }`}
                >
                  Étape 1
                  {currentSlide >= 1 && answeredYes[0] === true && (
                    <div className={styles.checkIcon}>✓</div>
                  )}
                </div>
                <div
                  className={`${styles.element} ${
                    currentSlide >= 2 && answeredYes[1] === true
                      ? styles.active
                      : ""
                  }`}
                >
                  Étape 2
                  {currentSlide >= 2 && answeredYes[1] === true && (
                    <div className={styles.checkIcon}>✓</div>
                  )}
                </div>
                <div
                  className={`${styles.element} ${
                    currentSlide >= 3 && answeredYes[2] === true
                      ? styles.active
                      : ""
                  }`}
                >
                  Étape 3
                  {currentSlide >= 3 && answeredYes[2] === true && (
                    <div className={styles.checkIcon}>✓</div>
                  )}
                </div>
                <div
                  className={`${styles.element} ${
                    currentSlide >= 4 && answeredYes[3] === true
                      ? styles.active
                      : ""
                  }`}
                >
                  Étape 4
                  {currentSlide >= 4 && answeredYes[3] === true && (
                    <div className={styles.checkIcon}>✓</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bandeau de pourcentage */}
      {showPercentageBanner && (
        <div className={`${styles.percentageBanner} ${styles[activeCardId]}`}>
          <div className={styles.percentageBannerInner}>
            <div className={styles.percentageContent}>
              <span
                className={`${styles.percentageValue} ${
                  responseType ? styles[responseType] : ""
                }`}
              >
                {percentageValue}
              </span>{" "}
              {percentageResponse}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SavoirsSection;
