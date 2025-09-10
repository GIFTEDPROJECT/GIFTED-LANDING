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
  const videoRef = useRef<HTMLVideoElement>(null);

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
      if (!sectionRef.current || !videoRef.current) return;

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

      // Synchroniser la vidéo avec le scroll
      if (videoRef.current.duration) {
        const videoTime = progress * videoRef.current.duration;
        videoRef.current.currentTime = videoTime;
      }

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
