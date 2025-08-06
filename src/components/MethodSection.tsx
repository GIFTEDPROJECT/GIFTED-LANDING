"use client";

import React from "react";
import styles from "./MethodSection.module.scss";

interface MethodSectionProps {
  className?: string;
  id?: string;
}

export const MethodSection: React.FC<MethodSectionProps> = ({
  className,
  id,
}) => {
  return (
    <section id={id} className={`${styles.methodSection} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>La méthode GIFTED, c'est simple</h2>
          <div className={styles.subtitleContainer}>
            <p className={styles.subtitle}>
              On conseille fortement la tablette pour les enfants...
            </p>
          </div>
        </div>

        <div className={styles.stepsContainer}>
          {/* Étape 1 */}
          <div className={styles.step}>
            <div className={styles.stepCircle}>
              <div className={styles.devicesContainer}>
                <div className={styles.laptop}>
                  <img src="/images/1.png" alt="Laptop avec jeu" />
                </div>
              </div>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>
                  Votre enfant répond à 5 questions d'autonomie
                </p>
                <p className={styles.stepSubtitle}>
                  2 min de Fun pour l'enfant
                </p>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div className={styles.step}>
            <div className={styles.stepCircle}>
              <div className={styles.phonesContainer}>
                <div className={styles.phoneFront}>
                  <img src="/images/2.png" alt="Validation parent" />
                </div>
              </div>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>
                  Vous validez ses réponses... ou vous les modifiez...
                </p>
                <p className={styles.stepSubtitle}>
                  Validation par le parent en quelques clics
                </p>
              </div>
            </div>
          </div>

          {/* Étape 3 */}
          <div className={styles.step}>
            <div className={styles.stepCircle}>
              <div className={styles.laptopReward}>
                <img src="/images/3.png" alt="Laptop avec récompense" />
              </div>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepText}>
                <p className={styles.stepTitle}>Une tâche validée</p>
                <p className={styles.stepSubtitle}>1 GIFT POINT</p>
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
