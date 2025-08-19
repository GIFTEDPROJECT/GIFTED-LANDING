"use client";

import React, { useState, useRef } from "react";
import styles from "./SavoirsSection.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ParcoursModal from "./Parcours/ParcoursModal";

interface SavoirsSectionProps {
  className?: string;
  id?: string;
}

const quizCards = [
  {
    id: "hygiene",
    title: "HYGIÈNE",
    description: "Pour la troisième fois, va te brosser les dents !",
    color: "green",
    position: "top-left",
    courseName: "Le Parcours Hygiène",
    question: "Est-ce que tu t'es lavé les dents ce matin ?",
    percentage: "87%",
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
    description: "Tu as vu l'état de ta chambre !!!",
    color: "blue",
    position: "top-right",
    courseName: "Le Parcours Rangement",
    question: "As-tu rangé ta chambre aujourd'hui ?",
    percentage: "84%",
    slides: [
      {
        image: "/images/slide4.png",
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
    description: "Non mais, tu parles pas comme ça !!!",
    color: "purple",
    position: "bottom-left",
    courseName: "Le Parcours Respect",
    question: "As-tu parlé poliment aujourd'hui ?",
    percentage: "64%",
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
    description: "Allez, montre-moi ton cahier de textes !!!",
    color: "yellow",
    position: "bottom-right",
    courseName: "Le Parcours Devoirs",
    question: "As-tu fait tes devoirs aujourd'hui ?",
    percentage: "99%",
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
  const swiperRef = useRef<any>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [showSecondContent, setShowSecondContent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answeredYes, setAnsweredYes] = useState<boolean[]>([]);
  const [visitedCards, setVisitedCards] = useState<string[]>([]);
  const [transformedCards, setTransformedCards] = useState<string[]>([]);
  const [isParcoursModalOpen, setIsParcoursModalOpen] = useState(false);

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

    // Ouvrir la popup
    setTimeout(() => {
      setOpenCard(cardId);
      setShowSecondContent(false);
      setCurrentSlide(0);
      setAnsweredYes([]);
    }, 1500);

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

  const handleDiscoverParcoursClick = () => {
    setIsParcoursModalOpen(true);
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
              <div className={styles.cardContent}>
                <div className={styles.cardBottomSection}>
                  <Image
                    src="/images/project1.png"
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
                    {transformedCards.includes(card.id) && (
                      <div
                        className={`${styles.transformedMessage} ${
                          styles[card.color]
                        }`}
                      >
                        Laissez Gifted répéter <span>à votre place</span>
                      </div>
                    )}
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
                {visitedCards.includes(card.id) && (
                  <div className={styles.cardCheckIcon}>✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Découvrir un parcours */}
        <div className={styles.discoverParcoursContainer}>
          <button
            className={styles.discoverParcoursButton}
            onClick={handleDiscoverParcoursClick}
          >
            <span>Découvrir un parcours</span>
            <img src="/images/arrow-down.png" alt="Découvrir" />
          </button>
        </div>
      </div>

      {/* Overlay pour les cartes ouvertes */}
      {openCard && (
        <div
          className={`${styles.overlay} ${styles[getCurrentCard()!.color]}`}
          onClick={handleOverlayClick}
        >
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
                } ${styles[getCurrentCard()!.color]}`}
              >
                <div className={styles.popupHeader}>
                  <p className={styles.popupHeaderSubtitle}>
                    <span>{getCurrentCard()?.percentage} </span>des parents
                    rencontrent cette difficulté.
                  </p>
                </div>
                <div className={styles.content}>
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoHeight={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    navigation={false}
                    className={styles.contentSwiper}
                    observer={true}
                    observeParents={true}
                    watchSlidesProgress={true}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      console.log("Swiper initialized:", swiper);
                    }}
                    onSlideChange={(swiper) => {
                      console.log("Slide changed to:", swiper.activeIndex);
                    }}
                  >
                    {getCurrentCard()?.slides?.map((slide, index) => (
                      <SwiperSlide key={index} className={styles.contentSlide}>
                        <div className={styles.slideContent}>
                          <div className={styles.slideImage}>
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              width={300}
                              height={200}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Boutons de navigation personnalisés */}
                  <button
                    className={styles.customPrevButton}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slidePrev();
                        console.log("Previous clicked");
                      }
                    }}
                  >
                    <img src="/images/swiper-arrow-left.png" alt="Précédent" />
                  </button>

                  <button
                    className={styles.customNextButton}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideNext();
                        console.log("Next clicked");
                      }
                    }}
                  >
                    <img src="/images/swiper-arrow-right.png" alt="Suivant" />
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
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, true]);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, false]);
                      }}
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
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, true]);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, false]);
                      }}
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
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, true]);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, false]);
                      }}
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
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, true]);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      className={styles.noButton}
                      onClick={() => {
                        setCurrentSlide(currentSlide + 1);
                        setAnsweredYes([...answeredYes, false]);
                      }}
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

      {/* Popin ParcoursModal */}
      <ParcoursModal
        isOpen={isParcoursModalOpen}
        onClose={() => setIsParcoursModalOpen(false)}
      />
    </section>
  );
};

export default SavoirsSection;
