"use client";

import React from "react";
import styles from "./WhySection.module.scss";
import Image from "next/image";

interface WhySectionProps {
  type: "children" | "parents";
  className?: string;
}

export const WhySection: React.FC<WhySectionProps> = ({ type, className }) => {
  const isChildren = type === "children";

  return (
    <section
      className={`${styles.whySection} ${
        isChildren ? styles.childrenSection : styles.parentsSection
      } ${className || ""}`}
    >
      <div className={styles.container}>
        <div
          className={`${styles.content} ${isChildren ? styles.reversed : ""}`}
        >
          <div className={styles.imageContainer}>
            <div className={styles.magicalImage}>
              {isChildren ? (
                // Image arbre magique pour enfants
                <Image
                  src="/images/about-child.jpg"
                  alt="Tree"
                  width={400} // Définir une largeur
                  height={400} // Définir une hauteur
                  style={{
                    objectFit: "contain",
                    width: "100% !important",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                  }}
                />
              ) : (
                // Image architecture magique pour parents

                <Image
                  src="/images/tree-parents.jpg"
                  alt="About"
                  width={400} // Définir une largeur
                  height={400} // Définir une hauteur
                  style={{
                    objectFit: "contain",
                    width: "100% !important",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                  }}
                />
              )}
            </div>
          </div>

          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              {isChildren
                ? "Pourquoi les enfants adorent GIFTED ?"
                : "Pourquoi les parents adorent GIFTED ?"}
            </h2>

            {isChildren ? (
              <div className={styles.description}>
                <p>
                  Les parcours d&apos;apprentissage sont ludiques et
                  interactifs, et les graphismes enchanteurs.
                </p>
                <p>
                  Pour les encourager dans leurs efforts, on leur offre du
                  PARTAGE : partage d&apos;activités en famille ou entre amis,
                  partage de cadeaux offerts par l&apos;appli...
                </p>
              </div>
            ) : (
              <div className={styles.description}>
                <p>
                  Les méthodes de GIFTED reposent sur des données scientifiques
                  validées.
                </p>
                <p>
                  L&apos;apprentissage en autonomie de GIFTED vous allège des
                  aspects contraignants de l&apos;éducation, et vous offre en
                  retour le temps de profiter pleinement du bonheur d&apos;être
                  parent...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
