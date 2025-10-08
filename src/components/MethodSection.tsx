"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./MethodSection.module.scss";

interface MethodSectionProps {
  className?: string;
  id?: string;
}

export const MethodSection: React.FC<MethodSectionProps> = ({
  className,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const sectionRef = useSectionRef(id || "method");
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            } else if (entry.target === headerRef.current) {
              setHeaderVisible(true);
            } else if (entry.target === stepsRef.current) {
              setStepsVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (headerRef.current) observer.observe(headerRef.current);
    if (stepsRef.current) observer.observe(stepsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.methodSection} ${className || ""}`}
    >
      <div className={styles.container}>
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.animate : ""}`}
        >
          <h2 className={styles.title}>Comment ça marche ?</h2>
        </div>

        <div
          ref={stepsRef}
          className={`${styles.stepsContainer} ${
            stepsVisible ? styles.animate : ""
          }`}
        >
          {/* Étape 1 */}
          <div
            className={`${styles.step} ${stepsVisible ? styles.animate : ""}`}
          >
            <div className={styles.imageContainer}>
              <img src="/images/1.png" alt="Laptop avec jeu" />
            </div>

            <div className={styles.stepContent}>
              <div
                className={`${styles.stepNumber} ${
                  stepsVisible ? styles.animate : ""
                }`}
              >
                1
              </div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>
                  Votre enfant répond <br />à 5 questions d'autonomie
                </p>
                <p className={styles.stepSubtitle}>
                  Nous déconseillons l’usage du smartphone pour les enfants, et
                  recommandons plutôt une tablette ou un ordinateur
                </p>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div
            className={`${styles.step} ${stepsVisible ? styles.animate : ""}`}
          >
            <div className={styles.phonesContainer}>
              <div className={styles.imageContainer}>
                <img src="/images/2.png" alt="Laptop avec jeu" />
              </div>
            </div>
            <div className={styles.stepContent}>
              <div
                className={`${styles.stepNumber} ${
                  stepsVisible ? styles.animate : ""
                }`}
              >
                2
              </div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>
                  Vous VÉRIFIEZ ses réponses, <br /> vous les MODIFIEZ si
                  besoin,
                  <br /> puis vous VALIDEZ
                </p>
                <p className={styles.stepSubtitle}>
                  Validation par le parent en quelques clics
                </p>
              </div>
            </div>
          </div>

          {/* Étape 3 */}
          <div
            className={`${styles.step} ${stepsVisible ? styles.animate : ""}`}
          >
            <div className={styles.imageContainer}>
              <img src="/images/3.png" alt="Laptop avec jeu" />
            </div>

            <div className={styles.stepContent}>
              <div
                className={`${styles.stepNumber} ${
                  stepsVisible ? styles.animate : ""
                }`}
              >
                3
              </div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>
                  Une tâche validée par le parent
                  <br />=<br />1 GIFT POINT pour l'enfant
                </p>
                <p className={styles.stepSubtitle}></p>
                <p className={styles.stepSubtitle}>
                  L'enfant s'amuse à récupérer ses GP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
