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
  const [showFirstResponse, setShowFirstResponse] = useState(false);
  const [firstResponseType, setFirstResponseType] = useState<
    "yes" | "no" | null
  >(null);

  const handleCardClick = (cardId: string) => {
    if (openCard === cardId) {
      setOpenCard(null);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
      setShowFirstResponse(false);
      setFirstResponseType(null);
    } else {
      setOpenCard(cardId);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
      setShowFirstResponse(false);
      setFirstResponseType(null);
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

  const handleYesClick = () => {
    setShowFirstResponse(true);
    setFirstResponseType("yes");
  };

  const handleNoClick = () => {
    setShowFirstResponse(true);
    setFirstResponseType("no");
  };

  const handleSlideYes = () => {
    setAnsweredYes((prev) => [...prev, true]);
    setCurrentSlide((prev) => Math.min(prev + 1, 4));
  };

  const handleSlideNo = () => {
    setAnsweredYes((prev) => [...prev, false]);
    setCurrentSlide((prev) => Math.min(prev + 1, 4));
  };

  const handleContinue = () => {
    setShowSecondContent(true);
    setShowFirstResponse(false);
    setFirstResponseType(null);
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
              onClick={() => handleCardClick(card.id)}
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
                    <button className={styles.cardYesButton}>OUI</button>
                    <button className={styles.cardNoButton}>NON</button>
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
                    setShowFirstResponse(false);
                    setFirstResponseType(null);
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
                      onClick={handleSlideYes}
                    >
                      Oui
                    </button>
                    <button className={styles.noButton} onClick={handleSlideNo}>
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
                      onClick={handleSlideYes}
                    >
                      Oui
                    </button>
                    <button className={styles.noButton} onClick={handleSlideNo}>
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
                      onClick={handleSlideYes}
                    >
                      Oui
                    </button>
                    <button className={styles.noButton} onClick={handleSlideNo}>
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
                      onClick={handleSlideYes}
                    >
                      Oui
                    </button>
                    <button className={styles.noButton} onClick={handleSlideNo}>
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
    </section>
  );
};

export default SavoirsSection;
