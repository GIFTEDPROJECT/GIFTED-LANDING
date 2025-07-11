"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./MethodesSection.module.scss";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const MethodesSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const methodes = [
    {
      id: 1,
      title: "Méthode motivationnelle",
      image: "/images/method1.png",
      description:
        "Dr Eve a pratiqué la thérapie motivationnelle pendant quinze ans: c'est la clé du soin en addictologie. Et son efficacité est démontrée pour accompagner tout processus de changement. Cette méthode permet à l'enfant de percevoir de tels bénéfices à leurs apprentissages, qu'ils ne ressentent plus les contraintes associées.",
      className: styles.motivationalCard,
    },
    {
      id: 2,
      title: "Neurosciences",
      image: "/images/method2.png",
      description:
        "Nos parcours d'apprentissage \"scolaire\" répondent aux critères les plus récents de la recherche en neurosciences appliquées à l'éducation, notamment aux quatre piliers définis par Stanislas Dehaene. Ils favorisent particulièrement l'attention -même pour les enfants diagnostiqués TDAH- et l'engagement actif dans l'apprentissage.",
      className: styles.neuroscienceCard,
    },
    {
      id: 3,
      title: "Intelligence artificielle",
      image: "/images/method3.png",
      description:
        "Elle permet à l'enfant d'obtenir des retours en temps réel, et de s'auto-corriger à mesure qu'il apprend. L'IA permet aussi de personnaliser l'enseignement, grâce à un apprentissage multimodal et différencié des parcours.",
      additionalDescription:
        "Les prompts utilisés pour ces parcours sont validés par une enseignante de l'éducation nationale.",
      className: styles.aiCard,
    },
  ];

  return (
    <section className={styles.methodesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          En quoi la méthode d&apos;apprentissage GIFTED est-elle innovante ?
        </h2>

        {/* Slider pour mobile */}
        <div className={styles.mobileSlider}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            navigation={false}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            pagination={{
              el: `.${styles.pagination}`,
              clickable: true,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
            }}
            className={styles.swiper}
          >
            {methodes.map((methode, index) => (
              <SwiperSlide
                key={methode.id}
                className={`${styles.swiperSlide} ${
                  index === activeSlide ? styles.swiperSlideActive : ""
                }`}
              >
                <div className={`${styles.card} ${methode.className}`}>
                  <div className={styles.cardImage}>
                    <Image
                      src={methode.image}
                      alt={methode.title}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{methode.title}</h3>
                    <p className={styles.cardDescription}>
                      {methode.description}
                    </p>
                    {methode.additionalDescription && (
                      <p className={styles.cardDescription}>
                        {methode.additionalDescription}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination pour mobile */}
          <div className={styles.pagination}></div>
        </div>

        {/* Grille pour desktop */}
        <div className={styles.cardsGrid}>
          {methodes.map((methode) => (
            <div
              key={methode.id}
              className={`${styles.card} ${methode.className}`}
            >
              <div className={styles.cardImage}>
                <Image
                  src={methode.image}
                  alt={methode.title}
                  width={300}
                  height={200}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{methode.title}</h3>
                <p className={styles.cardDescription}>{methode.description}</p>
                {methode.additionalDescription && (
                  <p className={styles.cardDescription}>
                    {methode.additionalDescription}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodesSection;
