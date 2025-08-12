"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);

  const phrases = [
    "Chaque petite tâche devient une grande victoire. ",
    "Temps d'écran inférieur à 5 min.",
    "Simple à comprendre pour l'enfant.",
    "Amusant à réaliser et ultra motivant grâce au système de récompenses réelles, et non virtuelles.",
    "Graphismes enchanteurs, qui résonnent avec l'imaginaire de l'enfant.",
    "Personnalisables par l'enfant (choix d'un avatar, choix du décor).",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;

      // Ne redémarrer que quand on sort de la section ET qu'on a atteint au moins une phrase
      if (rect.top > 0 && currentPhraseIndex >= 0) {
        setCurrentPhraseIndex(-1);
        return;
      }

      // Calculer le progrès de scroll dans la section (depuis top: 0)
      const progress = Math.max(
        0,
        Math.min(1, Math.abs(rect.top) / sectionHeight)
      );

      // Déterminer quelle phrase doit être visible
      const totalPhrases = phrases.length;
      const visibleIndex = Math.floor(progress * totalPhrases);

      if (visibleIndex !== currentPhraseIndex) {
        setCurrentPhraseIndex(visibleIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifier l'état initial

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [phrases.length]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.revealSection} ${className || ""}`}
    >
      {/* SVG Vague verticale beige */}
      <div className={styles.waveContainer}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 200 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C50,50 100,100 150,150 C180,200 200,250 200,300 C200,350 180,400 150,450 C100,500 50,550 0,600 L0,0 Z"
            fill="#eedcc9"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className={styles.container}>
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
      </div>
    </section>
  );
};
