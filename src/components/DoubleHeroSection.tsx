"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./DoubleHeroSection.module.scss";
import { FaPlay } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useOptimizedIntersection } from "../hooks/useOptimizedIntersection";

const DoubleHeroSection: React.FC = () => {
  // États simplifiés
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false);

  // Refs pour les éléments DOM
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion - Scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Animations basées sur le scroll
  const topContentOpacity = useTransform(scrollYProgress, [0.3, 0.35], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.82]);
  const bottomBlockVisible = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // Chapitre apparaît quand topContent disparaît, puis disparaît pour le titre
  const chapterOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.6, 0.65],
    [0, 1, 1, 0]
  );
  const chapterY = useTransform(scrollYProgress, [0.35, 0.4], [30, 0]);

  // Logo du bas apparaît AVANT que le premier logo ne disparaisse
  const logoBottomOpacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);

  // Titre principal apparaît quand chapitre disparaît
  const titleOpacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.6, 0.65], [30, 0]);

  // Bouton vidéo apparaît avec le titre
  const buttonOpacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.6, 0.65], [30, 0]);

  // Intersection Observer pour la deuxième partie
  const { elementRef: bottomHeroRef, isIntersecting: isBottomSectionVisible } =
    useOptimizedIntersection<HTMLDivElement>({
      threshold: 0.1,
      freezeOnceVisible: true,
    });

  // Observer pour le header
  useEffect(() => {
    const header = document.querySelector(
      'header, .sticky-header, [class*="header"]'
    ) as HTMLElement;

    if (header) {
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          setIsTitleVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      headerObserver.observe(header);
      return () => headerObserver.disconnect();
    }
  }, []);

  // Calculs dérivés
  const isChapterVisible = isBottomSectionVisible;

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`${styles.doubleHeroSection} ${
        isBottomSectionVisible ? "bottom-section-visible" : ""
      } ${isChapterVisible ? styles.chapterVisible : ""} ${
        isTitleVisible ? styles.titleVisible : ""
      }`}
    >
      <motion.div
        className={styles.topContent}
        style={{
          opacity: topContentOpacity,
        }}
      >
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
            Et si l'Enfance recréait <br />
            le Monde ?
          </span>
        </h1>

        {/* Flèche informative */}
        <div className={styles.chevronScroll}>
          <FaChevronDown className={styles.chevronIcon} />
          <FaChevronDown className={styles.chevronIcon} />
          <span className={styles.scrollText}>
            Scroller pour découvrir GIFTED
          </span>
        </div>
      </motion.div>

      {/* Bloc du haut - Titre centré */}
      <div className={styles.topBlock}></div>

      {/* Bloc du bas - Copie du HeroSection */}
      <motion.div
        ref={bottomHeroRef}
        className={`${styles.bottomBlock} ${
          bottomBlockVisible ? styles.visible : ""
        }`}
      >
        <motion.div
          ref={containerRef}
          className={styles.container}
          style={{
            scale: imageScale,
          }}
        >
          <motion.div
            className={styles.logoContainerBottom}
            style={{
              opacity: logoBottomOpacity,
            }}
          >
            <Image
              src="/images/rounded-logo.png"
              alt="GIFTED Logo"
              width={280}
              height={100}
              className={styles.logoImageBottom}
              priority
            />
          </motion.div>
          <motion.div
            className={styles.chapterStep}
            style={{
              opacity: chapterOpacity,
              y: chapterY,
            }}
          >
            <span className={styles.chapterText}>Chapitre 1 : l'Autonomie</span>
          </motion.div>
          <motion.h2
            className={styles.bottomTitle}
            style={{
              opacity: titleOpacity,
              y: titleY,
            }}
          >
            <br />
            <span>
              Transformez la discipline en un jeu d'enfants
              <br /> et regagnez du temps de qualité avec votre enfant
            </span>
          </motion.h2>

          {/* Bouton vidéo GIFTED */}
          {/*  <motion.button
            className={styles.videoButton}
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Regarder la vidéo GIFTED"
            style={{
              opacity: buttonOpacity,
              y: buttonY,
            }}
          >
            <FaPlay className={styles.playIcon} />
            <span className={styles.videoButtonText}>GIFTED en vidéo</span>
          </motion.button> */}

          <img
            src="/images/hero-bottom-img.png"
            alt="Double Hero Section Background"
            className={styles.doubleHeroSectionBackgroundImage}
          />

          {/* Flèche informative du bas */}
          <div className={styles.chevronScrollBottom}>
            <FaChevronDown className={styles.chevronIconBottom} />
            <FaChevronDown className={styles.chevronIconBottom} />
            <span className={styles.scrollTextBottom}>
              Continuer à découvrir
            </span>
          </div>

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
        </motion.div>
      </motion.div>

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
    </motion.section>
  );
};

export default DoubleHeroSection;
