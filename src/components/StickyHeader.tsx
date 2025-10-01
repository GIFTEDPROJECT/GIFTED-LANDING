"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import styles from "./StickyHeader.module.scss";
import Image from "next/image";
import Link from "next/link";
import { SectionRefsContext } from "@/contexts/SectionRefsContext";

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
  const [activeSection, setActiveSection] = useState<string>("");
  const { sectionRefs } = useContext(SectionRefsContext) || {
    sectionRefs: { current: {} },
  };

  // Navigation items
  const navigationItems = [
    { id: "savoirs", label: "Les parcours d'autonomie", href: "#savoirs" },
    { id: "method", label: "La méthode GIFTED", href: "#method" },
    { id: "contact", label: "Je m'inscris", href: "#pricing" },
    {
      id: "discover-future",
      label: "Le projet GIFTED",
      href: "#discover-future",
    },
  ];

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
      setIsVisible(scrollPosition > window.innerHeight * 1.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection de la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersection = 0;
        let activeId = "";

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersection
          ) {
            maxIntersection = entry.intersectionRatio;
            // Si c'est la section "reveal", l'associer à "method"
            activeId =
              entry.target.id === "reveal" ? "method" : entry.target.id;
          }
        });

        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: "-150px 0px -150px 0px",
      }
    );

    // Observer toutes les sections via refs
    Object.values(sectionRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      // Amener vers la section pricing
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Fallback : chercher par classe CSS
        const pricingElement = document.querySelector(".pricingSection");
        if (pricingElement) {
          pricingElement.scrollIntoView({ behavior: "smooth" });
        }
      }
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

          {/* Navigation desktop */}
          <nav className={styles.desktopNav}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.navLink} ${
                  activeSection === item.id ? styles.active : ""
                }`}
                onClick={() => handleNavClick(item.href)}
                aria-label={`Aller à la section ${item.label}`}
                data-section={item.id}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bouton personnalisable */}
          {renderButton()}
        </div>
      </header>
    </>
  );
};

export default StickyHeader;
