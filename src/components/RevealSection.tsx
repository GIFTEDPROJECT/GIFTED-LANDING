"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import { ChevronsUp, ChevronsDown } from "react-feather";
import styles from "./RevealSection.module.scss";

interface RevealSectionProps {
  className?: string;
  id?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  className,
  id,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(-1);
  const sectionRef = useSectionRef(id || "reveal");
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentPhraseIndexRef = useRef(-1);

  const phrases = [
    "Chaque petite tâche devient une grande victoire. ",
    "Temps d'écran inférieur à 5 min.",
    "Simple à comprendre pour l'enfant.",
    "Amusant à réaliser et ultra motivant grâce au système de récompenses réelles, et non virtuelles.",
    "Graphismes enchanteurs, qui résonnent avec l'imaginaire de l'enfant.",
    "Parcours entièrement personnalisables. ( thématiques, questions... )",
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !videoRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;

          // Ne redémarrer que quand on sort de la section ET qu'on a atteint au moins une phrase
          if (rect.top > 0 && currentPhraseIndexRef.current >= 0) {
            setCurrentPhraseIndex(-1);
            currentPhraseIndexRef.current = -1;
            ticking = false;
            return;
          }

          // Calculer le progrès de scroll dans la section (depuis top: 0)
          const progress = Math.max(
            0,
            Math.min(1, Math.abs(rect.top) / sectionHeight)
          );

          // Synchroniser la vidéo avec le scroll (avec throttling)
          if (
            videoRef.current.duration &&
            Math.abs(
              videoRef.current.currentTime -
                progress * videoRef.current.duration
            ) > 0.1
          ) {
            const videoTime = progress * videoRef.current.duration;
            videoRef.current.currentTime = videoTime;
          }

          // Déterminer quelle phrase doit être visible avec des transitions ultra fluides
          const totalPhrases = phrases.length;
          // Ajuster le calcul pour que la dernière phrase soit plus accessible
          const adjustedProgress = Math.min(1, progress * 1.2); // Réduire le multiplicateur
          // Utiliser Math.round au lieu de Math.floor pour un accès plus facile à la dernière phrase
          const visibleIndex = Math.min(
            Math.round(adjustedProgress * (totalPhrases - 1)),
            totalPhrases - 1
          );

          if (
            visibleIndex !== currentPhraseIndexRef.current &&
            visibleIndex >= 0
          ) {
            setCurrentPhraseIndex(visibleIndex);
            currentPhraseIndexRef.current = visibleIndex;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Vérifier l'état initial

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phrases.length]);

  // Synchroniser le ref avec le state
  useEffect(() => {
    currentPhraseIndexRef.current = currentPhraseIndex;
  }, [currentPhraseIndex]);

  const handleNextSection = () => {
    // Aller à la section suivante (pricing)
    const nextSection = document.getElementById("pricing");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePreviousSection = () => {
    // Aller à la section précédente (method)
    const previousSection = document.getElementById("method");
    if (previousSection) {
      previousSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.revealSection} ${className || ""}`}
    >
      {/* Vidéo de fond paysage */}

      <div className={styles.container}>
        {" "}
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/images/payasagevideo.mp4" type="video/mp4" />
        </video>
        {/* Bouton précédent - au-dessus du texte */}
        <div className={styles.navigationControlsTop}>
          <button
            className={`${styles.navButton} ${styles.previousButton}`}
            onClick={handlePreviousSection}
            aria-label="Section précédente"
          >
            <ChevronsUp size={24} />
            <span>Comment ça marche ?</span>
            <ChevronsUp size={24} />
          </button>
        </div>
        <div className={styles.phrasesContainer}>
          {phrases.map((phrase, index) => (
            <span
              key={index}
              className={`${styles.phrase} ${
                index === currentPhraseIndex ? styles.visible : ""
              }`}
            >
              {phrase}
            </span>
          ))}
        </div>
        {/* Bouton suivant - en dessous du texte */}
        <div className={styles.navigationControlsBottom}>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNextSection}
            aria-label="Section suivante"
          >
            <ChevronsDown size={24} />
            <span>Je m'inscris</span>
            <ChevronsDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
