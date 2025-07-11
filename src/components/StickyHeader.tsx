"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./StickyHeader.module.scss";
import Image from "next/image";
import Link from "next/link";

interface StickyHeaderProps {
  className?: string;
  buttonLabel?: string;
  buttonAction?: () => void;
  buttonHref?: string;
  showButton?: boolean;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  className,
  buttonLabel = "Je m'inscris",
  buttonAction,
  buttonHref,
  showButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRainingGifts, setIsRainingGifts] = useState(false);

  // Générer des positions et délais stables pour les cadeaux
  const giftConfigs = useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => ({
      id: index,
      left: index % 2 === 0 ? `${(index * 5) % 100}%` : "auto",
      right: index % 2 === 1 ? `${(index * 5) % 100}%` : "auto",
      delay: `${(index * 0.1) % 2}s`,
      duration: `${4 + (index % 3)}s`, // Durée plus longue pour un fadeOut plus naturel
      size: 40 + (index % 4) * 10,
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInscriptionClick = () => {
    // Déclencher la pluie de cadeaux immédiatement
    setIsRainingGifts(true);

    // Arrêter la pluie après 8 secondes
    setTimeout(() => {
      setIsRainingGifts(false);
    }, 8000);

    if (buttonAction) {
      buttonAction();
    } else {
      const pricingTitle = document.querySelector("#pricing .subtitle");
      if (pricingTitle) {
        pricingTitle.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Fallback vers la section pricing si le titre n'est pas trouvé
        const pricingSection = document.getElementById("pricing");
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Action par défaut : scroll vers le titre H2 de la section pricing
    }
  };

  const renderButton = () => {
    if (!showButton) return null;

    if (buttonHref) {
      return (
        <Link href={buttonHref} className={styles.inscriptionButton}>
          {buttonLabel}
        </Link>
      );
    }

    return (
      <button
        className={styles.inscriptionButton}
        onClick={handleInscriptionClick}
      >
        {buttonLabel}
      </button>
    );
  };

  return (
    <>
      {/* Pluie de cadeaux */}
      {isRainingGifts && (
        <div className={styles.giftRain}>
          {giftConfigs.map((config) => (
            <div
              key={config.id}
              className={`${styles.rainGift} ${
                config.right !== "auto" ? styles.rainGiftRight : ""
              }`}
              style={{
                left: config.left,
                right: config.right,
                animationDelay: config.delay,
                animationDuration: config.duration,
              }}
            >
              <Image
                src="/images/gift.png"
                alt="Cadeau qui tombe"
                width={config.size}
                height={config.size}
                className={styles.rainGiftImage}
              />
            </div>
          ))}
        </div>
      )}

      <header
        className={`${styles.stickyHeader} ${
          isVisible ? styles.visible : styles.hidden
        } ${className || ""}`}
      >
        <div className={styles.container}>
          {/* Logo GIFTED */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="GIFTED"
              width={154}
              height={40}
              className={styles.logo}
            />
          </Link>

          {/* Bouton personnalisable */}
          {renderButton()}
        </div>
      </header>
    </>
  );
};

export default StickyHeader;
