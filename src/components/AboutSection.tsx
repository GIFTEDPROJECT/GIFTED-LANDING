"use client";

import React from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./AboutSection.module.scss";
import Image from "next/image";
interface AboutSectionProps {
  className?: string;
  id?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  className,
  id,
}) => {
  const sectionRef = useSectionRef(id || "about");

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.aboutSection} ${className || ""}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/eve.png"
              alt="About"
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

          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              Dites <span>Bye-bye</span> aux conflits, et <span>Welcome</span>{" "}
              au bonheur en famille
            </h2>
            <p className={styles.description}>
              Conçu par une psychiatre, GIFTED est une aventure éducative, qui
              commence par apprendre l’autonomie aux enfants de primaire.
              <br /> Notre promesse : vous rendre ce précieux temps, où l’on
              peut profiter pleinement du bonheur d’être parent...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
