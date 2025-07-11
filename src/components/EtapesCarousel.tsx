"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";
import styles from "./EtapesCarousel.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export const EtapesCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlides, setExpandedSlides] = useState<{
    [key: number]: boolean;
  }>({});
  const swiperRef = useRef<SwiperType | null>(null);

  const toggleDescription = (slideId: number) => {
    setExpandedSlides((prev) => ({
      ...prev,
      [slideId]: !prev[slideId],
    }));

    // Mettre à jour la hauteur du Swiper après un court délai pour laisser le DOM se mettre à jour
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.update();
        swiperRef.current.updateSize();
        swiperRef.current.updateSlides();
      }
    }, 100);
  };

  const etapes = [
    {
      id: 1,
      title: "Parcours d'Autonomie",
      image: "/images/slide1.png",
      description:
        "Rendre vos enfants responsables et autonomes sur leurs tâches quotidiennes, en cinq minutes de FUN par jour. Quatre parcours pour commencer : Hygiène, rangement, respect, devoirs. Puis d'autres thématiques que vous pourrez personnaliser...",
    },
    {
      id: 2,
      title: "Économie de partage",
      image: "/images/project3.png",
      description:
        "Ensuite nous développons le Grand Jeu des WINNER TEAMS, la première économie de partage pour enfants. Les cadeaux gagnés sur l'appli deviennent des trésors partagés d'une économie circulaire: un nouveau mode de consommation plus riche en expériences, en partages.",
    },
    {
      id: 3,
      title: "Créa teams",
      image: "/images/project4.png",
      description:
        "Puis les CREA TEAMS, notre bijou...: des parcours conçus avec passion, qui guident les enfants pas à pas, pour leur apprendre à recréer, en équipe, leurs propres cours, sous forme d'histoire, et en utilisant des outils numériques d'IA et de création graphique (Canva). Nous sommes accompagnés par le cabinet le plus expert en RGPD pour mineurs dans le développement de cette fonctionnalité.",
    },
    {
      id: 4,
      title: "Parcours d'apprentisage",
      image: "/images/project6.png",
      description:
        "Puis développement des parcours d'apprentissage, en commençant par les parcours \"j'adore lire\" et \"j'adore écrire\", qui rencontrent un succès remarquable auprès des premiers enfants testés. Ensuite les enfants de primaire pourront apprendre l'ensemble des notions au programme en maths et en français. La méthode est innovante, par son caractère multimodal: chaque notion est enseignée de plusieurs manières différentes.... l'enseignement s'adapte aussi au niveau de chaque enfant (enseignement diférencié).",
    },
    {
      id: 5,
      title: "Collégiens / lycéens",
      image: "/images/project5.png",
      description:
        "Enfin (ça on en rêve tellement)... accompagner nos Gifters vers le collège et lycée, et leur transmettre les valeurs et les compétences entrepreneuriales (coopération, partage, innovation conceptuelle, résolution de problèmes...) Hâte de voir comment ils recréeront un Monde, où chaque brique sera l'une de leurs oeuvres entrepreneuriales....",
    },
  ];

  return (
    <section className={styles.etapesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Les étapes clé du GIFTED PROJECT...</h2>

        <div className={styles.swiperContainer}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1.2}
            autoHeight={true}
            navigation={false}
            pagination={{
              el: `.${styles.pagination}`,
              clickable: true,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
              dynamicBullets: false,
              renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                navigation: {
                  prevEl: `.${styles.prevButton}`,
                  nextEl: `.${styles.nextButton}`,
                },
              },
            }}
            className={styles.swiper}
          >
            {etapes.map((etape, index) => (
              <SwiperSlide
                key={etape.id}
                className={`${styles.swiperSlide} ${
                  index === activeSlide ? styles.swiperSlideActive : ""
                }`}
              >
                <div className={styles.slideCard}>
                  <div className={styles.slideImage}>
                    <Image
                      src={etape.image}
                      alt={etape.title}
                      width={1000}
                      height={1000}
                      priority
                    />
                  </div>
                  <div className={styles.slideContent}>
                    <h3 className={styles.slideTitle}>{etape.title}</h3>
                    <div className={styles.slideDescriptionContainer}>
                      <p
                        className={`${styles.slideDescription} ${
                          expandedSlides[etape.id] ? styles.expanded : ""
                        }`}
                      >
                        {etape.description}
                      </p>
                      <button
                        className={styles.expandButton}
                        onClick={() => toggleDescription(etape.id)}
                      >
                        {expandedSlides[etape.id] ? "Voir moins" : "Voir plus"}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.pagination}></div>
        </div>
      </div>
    </section>
  );
};

export default EtapesCarousel;
