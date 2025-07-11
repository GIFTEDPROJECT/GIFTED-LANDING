"use client";

import React from "react";
import styles from "./ProjetsSection.module.scss";
import Image from "next/image";

export const ProjetsSection: React.FC = () => {
  const projets = [
    {
      id: 1,
      image: "/images/project1.png",
      title: "Parcours d'Autonomie: courant septembre 2025",
    },
    {
      id: 2,
      image: "/images/project2.png",
      title: "Parcours lecture et écriture: fin 2025",
    },
    {
      id: 3,
      image: "/images/project3.png",
      title: "Économie de partage pour enfants Printemps 2026",
    },
    {
      id: 4,
      image: "/images/project4.png",
      title: "CRÉA TEAMS en été 2026",
    },
    {
      id: 5,
      image: "/images/project5.png",
      title: "Lancement de l'appli pour les collèges: rentrée 2026",
    },
    {
      id: 6,
      image: "/images/project6.png",
      title:
        "Parcours d'apprentissage en math et français, selon la méthode multimodale et différenciée, pour l'année scolaire 2026/2027",
    },
  ];

  return (
    <section className={styles.projetsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Avec votre soutien, toutes ces idées verront le jour plus
          rapidement...
        </h2>

        <div className={styles.projetsGrid}>
          {projets.map((projet) => (
            <div key={projet.id} className={styles.projetCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={projet.image}
                  alt={projet.title}
                  width={400} // Définir une largeur
                  height={400} // Définir une hauteur
                  style={{
                    objectFit: "contain",
                    width: "100% !important",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <h3 className={styles.projetTitle}>{projet.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjetsSection;
