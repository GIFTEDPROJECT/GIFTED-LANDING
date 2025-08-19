"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./FooterParcours.module.scss";

interface FooterParcoursProps {
  parcoursData: Array<{
    question: string;
    answerText: string;
  }>;
  isStarted: boolean;
  answers: boolean[];
  currentStep?: number;
}

export const FooterParcours: React.FC<FooterParcoursProps> = ({
  parcoursData,
  answers,
  isStarted,
  currentStep = 0,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Faire avancer automatiquement le Swiper à chaque changement d'étape (mobile uniquement)
  useEffect(() => {
    if (swiperRef.current && isStarted && isMobile) {
      swiperRef.current.slideTo(currentStep, 300); // Animation de 300ms
    }
  }, [currentStep, isStarted, isMobile]);

  return (
    <div
      className={`${styles.footerParcours} ${isStarted ? styles.started : ""}`}
    >
      {isMobile ? (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={3}
          spaceBetween={10}
          centeredSlides={true}
          initialSlide={currentStep}
          modules={[Pagination]}
          className={styles.swiperContainer}
        >
          {parcoursData.map((item, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div
                className={`${styles.footerParcoursItem} ${
                  index < answers.length
                    ? answers[index]
                      ? styles.yes
                      : styles.no
                    : ""
                } ${index === currentStep ? styles.active : ""}`}
              >
                <div className={styles.bg}>
                  <img src="/images/nenuphare.png" alt="Hygiene" />
                  {index < answers.length && answers[index] && (
                    <div className={styles.gitfMoney}>
                      <img src="/images/gift-money.png" alt="Money" />
                    </div>
                  )}
                </div>
                <div className={styles.answer}>{item.answerText}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Version desktop : affichage normal sans Swiper
        <div className={styles.desktopContainer}>
          {parcoursData.map((item, index) => (
            <div
              key={index}
              className={`${styles.footerParcoursItem} ${
                index < answers.length
                  ? answers[index]
                    ? styles.yes
                    : styles.no
                  : ""
              } ${index === currentStep ? styles.active : ""}`}
            >
              <div className={styles.bg}>
                <img src="/images/nenuphare.png" alt="Hygiene" />
                {index < answers.length && answers[index] && (
                  <div className={styles.gitfMoney}>
                    <img src="/images/gift-money.png" alt="Money" />
                  </div>
                )}
              </div>
              <div className={styles.answer}>{item.answerText}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FooterParcours;
