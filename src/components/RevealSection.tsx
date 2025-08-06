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
    "Simples à comprendre pour l'enfant.",
    "Amusants à réaliser et ultra motivants grâce au système de récompenses réelles, et non virtuelles.",
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
