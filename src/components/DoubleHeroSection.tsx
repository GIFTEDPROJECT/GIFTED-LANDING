"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./DoubleHeroSection.module.scss";
import { FaPlay } from "react-icons/fa";

const DoubleHeroSection: React.FC = () => {
  const [visiblePart, setVisiblePart] = useState<boolean>(false);
  const [topContentHidden, setTopContentHidden] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [bottomVisible, setBottomVisible] = useState<boolean>(false);
  const [initialScrollY, setInitialScrollY] = useState<number>(0);
  const [movementStarted, setMovementStarted] = useState<boolean>(false);
  const [imageScale, setImageScale] = useState<number>(1);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);

  // Constante pour la hauteur de la fenêtre
  const WINDOW_HEIGHT = typeof window !== "undefined" ? window.innerHeight : 0;

  // Méthode principale qui gère le scroll et retourne la position
  const getScrollPosition = useCallback(() => {
    return window.scrollY;
  }, []);

  // useEffect principal qui met à jour la position de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = getScrollPosition();
      setCurrentScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getScrollPosition]);

  // useEffect pour topContentHidden
  useEffect(() => {
    if (currentScrollY > WINDOW_HEIGHT / 1.2) {
      setTopContentHidden(true);
    } else {
      setTopContentHidden(false);
    }
  }, [currentScrollY]);

  // useEffect pour visible
  useEffect(() => {
    if (currentScrollY > WINDOW_HEIGHT + 200) {
      setVisiblePart(true);

      // Calculer le rétrécissement de l'image basé sur le scroll
      const sectionHeight = 300 * WINDOW_HEIGHT; // 300vh
      const availableScrollDistance = sectionHeight - WINDOW_HEIGHT; // 200vh de scroll disponible
      const currentScrollDistance = currentScrollY - WINDOW_HEIGHT;

      // Animation plus rapide : commence dès le début et atteint 0.6 à mi-parcours
      const scrollProgress = Math.min(
        currentScrollDistance / (availableScrollDistance * 0.5),
        1
      );
      const newScale = Math.min(1, 1 - scrollProgress * 30); // Rétrécir de 40% maximum (de 1 à 0.6)

      // Arrêter l'animation quand bottomVisible est true
      if (!bottomVisible) {
        setImageScale(Math.max(0.6, newScale));
      }

      // Détecter quand le bas de la section est visible
      const sectionElement = document.querySelector(
        `.${styles.doubleHeroSection}`
      );
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        const isBottomVisible = rect.bottom <= WINDOW_HEIGHT && rect.bottom > 0;

        // Capturer la position initiale quand bottomVisible devient true
        if (isBottomVisible && !bottomVisible) {
          setInitialScrollY(currentScrollY);
          setMovementStarted(true);
        }

        // Détecter quand le fixedBackground doit disparaître (son top arrive en haut)
        if (movementStarted && !isBottomVisible) {
          const backgroundTop = currentScrollY - initialScrollY;
          if (backgroundTop >= WINDOW_HEIGHT) {
            setMovementStarted(false);
          }
        }

        setBottomVisible(isBottomVisible);
      }
    } else {
      setVisiblePart(false);
      setBottomVisible(false);
      setImageScale(1);
    }
  }, [currentScrollY, bottomVisible, initialScrollY, movementStarted]);

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <section
      className={`${styles.doubleHeroSection} ${
        visiblePart ? styles.visible : ""
      } ${topContentHidden ? styles.topContentHidden : ""} ${
        bottomVisible ? "bottom-section-visible" : ""
      }`}
    >
      <div className={styles.topContent}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/rounded-logo.png"
            alt="GIFTED Logo"
            width={280}
            height={100}
            className={styles.logoImage}
            priority
          />
        </div>
        <h1 className={styles.mainTitle}>
          <span>
            Et si l'enfance recréait <br />
            le monde ?
          </span>
        </h1>
      </div>
      {/* Bloc du haut - Titre centré */}
      <div className={styles.topBlock}></div>

      {/* Bloc du bas - Copie du HeroSection */}
      <div
        id="bottom-hero"
        className={`${styles.bottomBlock} ${visiblePart ? styles.visible : ""}`}
        style={{}}
      >
        <div
          className={styles.container}
          style={{
            transform: `scale(${imageScale})`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className={styles.logoContainerBottom}>
            <Image
              src="/images/rounded-logo.png"
              alt="GIFTED Logo"
              width={280}
              height={100}
              className={styles.logoImageBottom}
              priority
            />
          </div>
          <h2 className={styles.bottomTitle}>
            <span>
              Rendez vos enfants autonomes <br />
              en 5 minutes de fun par jour.
            </span>
          </h2>
          <img
            src="/images/hero-bottom-img.png"
            alt="Double Hero Section Background"
            className={styles.doubleHeroSectionBackgroundImage}
          />
          <div className={styles.bottomSection}>
            <div className={styles.womanImage}>
              <Image
                src="/images/woman.png"
                alt="Woman"
                width={250}
                height={400}
              />
            </div>
            <div className={styles.manImage}>
              <Image src="/images/man.png" alt="Man" width={250} height={400} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal vidéo */}
      {isVideoModalOpen && (
        <div
          className={`${styles.videoModal} ${styles.fadeIn}`}
          onClick={closeVideoModal}
        >
          <div
            className={`${styles.videoModalContent} ${styles.slideUp}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeVideoModal}>
              ×
            </button>
            <video
              className={styles.videoPlayer}
              controls
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            >
              <source src="/video/video.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoubleHeroSection;
