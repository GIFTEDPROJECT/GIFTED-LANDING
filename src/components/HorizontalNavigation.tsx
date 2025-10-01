"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { useSectionRefs } from "@/contexts/SectionRefsContext";
import styles from "./HorizontalNavigation.module.scss";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: "savoirs", label: "Les parcours d'autonomie", href: "#savoirs" },
  { id: "method", label: "La méthode GIFTED", href: "#method" },
  { id: "contact", label: "Je m'inscris", href: "#pricing" },
  {
    id: "discover-future",
    label: "Le projet GIFTED",
    href: "#discover-future",
  },
];

const HorizontalNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const swiperRef = useRef<any>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Utiliser le contexte pour accéder aux refs
  const { sectionRefs } = useSectionRefs();

  // Observer pour détecter la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trouver la section avec la plus grande intersection
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
  }, []);

  // Afficher la navigation après le scroll et détecter la section active
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300); // Afficher après 300px de scroll

      // Throttling pour éviter les changements trop rapides
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        // Détecter la section active par scroll en utilisant les refs
        const sections = navigationItems
          .map((item) => ({
            id: item.id,
            element: sectionRefs.current[item.id],
            top: sectionRefs.current[item.id]?.offsetTop || 0,
          }))
          .filter((section) => section.element);

        // Détection simple et fluide des sections
        const currentSection = sections.find((section, index) => {
          const nextSection = sections[index + 1];
          const sectionTop = section.top - 200; // Offset pour l'activation
          const sectionBottom = nextSection ? nextSection.top - 200 : Infinity;

          return scrollY >= sectionTop && scrollY < sectionBottom;
        });

        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      }, 50); // Délai de 50ms
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Centrer l'onglet actif avec Swiper (mobile uniquement)
  useEffect(() => {
    if (
      activeSection &&
      swiperRef.current &&
      swiperRef.current.slideTo &&
      window.innerWidth <= 768
    ) {
      const activeIndex = navigationItems.findIndex(
        (item) => item.id === activeSection
      );
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300); // Animation de 300ms
      }
    }
  }, [activeSection]);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navigation} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.container}>
        {/* Version desktop - sans Swiper */}
        <div className={styles.desktopNav}>
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
        </div>

        {/* Version mobile - avec Swiper */}
        <div className={styles.mobileNav}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[FreeMode, Navigation]}
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            slidesPerView="auto"
            spaceBetween={8}
            centeredSlides={false}
            className={styles.swiperContainer}
          >
            {navigationItems.map((item) => (
              <SwiperSlide key={item.id} className={styles.swiperSlide}>
                <button
                  className={`${styles.navLink} ${
                    activeSection === item.id ? styles.active : ""
                  }`}
                  onClick={() => handleNavClick(item.href)}
                  aria-label={`Aller à la section ${item.label}`}
                  data-section={item.id}
                >
                  {item.label}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavigation;
