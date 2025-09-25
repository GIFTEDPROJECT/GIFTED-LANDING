"use client";

import React, { useState } from "react";
import styles from "./ParcoursSliderModal.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ParcoursSliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcoursId: number;
  parcoursTitle: string;
  parcoursDescription: string;
}

const parcoursImages = {
  1: {
    title: "Parcours Hygiène",
    percentage: "87%",
    statisticText:
      "87% des parents répètent chaque jour à leur enfant de se brosser les dents",
    images: [
      "/assets/images/parcours/1/slide/1.png",
      "/assets/images/parcours/1/slide/2.png",
      "/assets/images/parcours/1/slide/3.png",
      "/assets/images/parcours/1/slide/4.png",
      "/assets/images/parcours/1/slide/5.png",
    ],
  },
  2: {
    title: "Parcours Rangement",
    percentage: "84%",
    statisticText:
      "84% des parents se plaignent du désordre dans la chambre de leur enfant",
    images: [
      "/assets/images/parcours/2/slide/1.png",
      "/assets/images/parcours/2/slide/2.png",
      "/assets/images/parcours/2/slide/3.png",
      "/assets/images/parcours/2/slide/4.png",
      "/assets/images/parcours/2/slide/5.png",
    ],
  },
  3: {
    title: "Parcours Respect",
    percentage: "64%",
    statisticText:
      "64% des parents doivent rappeler à l'ordre leur enfant sur le respect",
    images: [
      "/assets/images/parcours/3/slide/1.png",
      "/assets/images/parcours/3/slide/2.png",
      "/assets/images/parcours/3/slide/3.png",
      "/assets/images/parcours/3/slide/4.png",
      "/assets/images/parcours/3/slide/5.png",
    ],
  },
  4: {
    title: "Parcours Devoirs",
    percentage: "99%",
    statisticText:
      "99% des parents accompagnent leur enfant dans ses devoirs quotidiennement",
    images: [
      "/assets/images/parcours/4/slide/1.png",
      "/assets/images/parcours/4/slide/2.png",
      "/assets/images/parcours/4/slide/3.png",
      "/assets/images/parcours/4/slide/4.png",
      "/assets/images/parcours/4/slide/5.png",
    ],
  },
};

export const ParcoursSliderModal: React.FC<ParcoursSliderModalProps> = ({
  isOpen,
  onClose,
  parcoursId,
  parcoursTitle,
  parcoursDescription,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const parcoursData =
    parcoursImages[parcoursId as keyof typeof parcoursImages];

  if (!isOpen || !parcoursData) return null;

  // Mapping des couleurs par parcours
  const getParcoursColor = (id: number) => {
    const colorMapping: Record<number, string> = {
      1: "green", // Hygiène
      2: "blue", // Rangement
      3: "purple", // Respect
      4: "yellow", // Devoirs
    };
    return colorMapping[id] || "green";
  };

  const parcoursColor = getParcoursColor(parcoursId);

  const handleClose = () => {
    setCurrentSlide(0);
    onClose();
  };

  return (
    <div
      className={`${styles.modalOverlay} ${styles[parcoursColor]}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modalContent} ${styles[parcoursColor]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <p className={styles.statisticText}>{parcoursData.statisticText}</p>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* Slider */}
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            pagination={{
              clickable: true,
              bulletClass: styles.swiperPaginationBullet,
              bulletActiveClass: styles.swiperPaginationBulletActive,
            }}
            /* autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }} */
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className={styles.swiper}
          >
            {parcoursData.images.map((imageSrc, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.slideContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src={imageSrc}
                      alt={`Slide ${index + 1} du ${parcoursData.title}`}
                      className={styles.slideImage}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <div className={styles.swiperButtonPrev}>
            <FaChevronLeft size={20} />
          </div>
          <div className={styles.swiperButtonNext}>
            <FaChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursSliderModal;
