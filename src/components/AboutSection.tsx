"use client";

import React from "react";
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
  return (
    <section id={id} className={`${styles.aboutSection} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/dr-eve.png"
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
          </div>

          <div className={styles.textContainer}>
            <h2 className={styles.title}>À quoi sert GIFTED ?</h2>
            <p className={styles.description}>
              Conçu par une psychiatre,
              <br />
              GIFTED est une aventure éducative, qui apprend aux enfants ce
              qu&apos;on n&apos;apprend pas à l&apos;école : <br />
              l&apos;autonomie, la créativité, l&apos;esprit d&apos;innovation,
              le bon usage du numérique, le travail en équipe, la conscience
              écologique, la valeur du partage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
