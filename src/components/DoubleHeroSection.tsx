import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DoubleHeroSection.module.scss";

const DoubleHeroSection: React.FC = () => {
  const [visiblePart, setVisiblePart] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight - 1;

      // Ajouter la classe 'visible' au body quand le scroll dépasse la hauteur de l'écran
      if (scrollY > windowHeight) {
        setVisiblePart(true);
      } else {
        setVisiblePart(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    const bottomSection = document.getElementById("bottom-hero");
    if (bottomSection) {
      bottomSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <section className={styles.doubleHeroSection}>
      {/* Bloc du haut - Titre centré */}
      <div className={styles.topBlock}>
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
            Rendez vos enfants <span>responsables</span> ET{" "}
            <span>AUTONOMES</span> en 5 min de fun par jour
          </h1>
          <div
            className={styles.scrollArrow}
            onClick={scrollToBottom}
            aria-label="Aller au contenu principal"
          >
            <Image
              src="/images/arrow-down2.png"
              alt="Flèche vers le bas"
              fill
              className={styles.scrollArrowImage}
            />
          </div>
        </div>
      </div>

      {/* Bloc du bas - Copie du HeroSection */}
      <div
        id="bottom-hero"
        className={`${styles.bottomBlock} ${visiblePart ? styles.visible : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Et si l'Enfance recréait le Monde ?
            </h1>
            <div className={styles.ctaSection}>
              <button className={styles.ctaButton} onClick={openVideoModal}>
                Découvrir Gifted en vidéo
              </button>
            </div>
          </div>
        </div>

        {/* Arrivée des parents */}
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

        {/* Flèche de scroll en bas */}
        <div
          className={styles.scrollArrow}
          onClick={scrollToNextSection}
          aria-label="Aller à la section suivante"
        >
          <Image
            src="/images/arrow-down2.png"
            alt="Flèche vers le bas"
            fill
            className={styles.scrollArrowImage}
          />
        </div>
      </div>

      {/* Modal vidéo */}
      {isVideoModalOpen && (
        <div
          className={`${styles.videoModal} ${styles.fadeIn}`}
          onClick={closeVideoModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "transparent",
            backdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className={`${styles.videoModalContent} ${styles.slideUp}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "80vw",
              maxWidth: "1200px",
              aspectRatio: "16/9",
              background: "#000",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <button
              className={styles.closeButton}
              onClick={closeVideoModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(0, 0, 0, 0.7)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10001,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
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
