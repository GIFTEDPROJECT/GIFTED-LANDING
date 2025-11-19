"use client";

import React from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import Image from "next/image";
import styles from "./ShareSection.module.scss";

interface ShareSectionProps {
  id?: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ id }) => {
  const sectionRef = useSectionRef(id || "share");

  return (
    <section ref={sectionRef} id={id} className={styles.shareSection}>
      <div className={styles.screensContainer}>
        <div className={styles.screen}>
          <div className={styles.firstScreenContent}>
            <h2 className={styles.title}>
              Et grâce aux <span className={styles.highlight}>Gift Points</span>{" "}
              il choisit...
            </h2>
            <p className={styles.subtitle}>...des moments de partage</p>
            <div className={styles.blocksGrid}>
              {/* Bloc 1 : image à gauche, nuage à droite */}
              <div className={styles.block}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/share-section1-img1.png"
                    alt="Moment de partage"
                    width={500}
                    height={500}
                    className={styles.blockImage}
                  />
                </div>
                <div className={styles.cloudContainer}>
                  <p className={styles.cloudText}>
                    ...qui renforcent
                    <br /> leurs liens
                  </p>
                </div>
              </div>
              {/* Bloc 2 : nuage à gauche, image à droite */}
              <div className={styles.block}>
                <div className={styles.cloudContainer}>
                  <p className={styles.cloudText}>
                    réels,
                    <br /> bien humains
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/share-section1-img2.png"
                    alt="Moment de partage"
                    width={500}
                    height={500}
                    className={styles.blockImage}
                  />
                </div>
              </div>
              {/* Bloc 3 : image à gauche, nuage à droite */}
              <div className={styles.block}>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/share-section1-img3.png"
                    alt="Moment de partage"
                    width={500}
                    height={500}
                    className={styles.blockImage}
                  />
                </div>
                <div className={styles.cloudContainer}>
                  <p className={styles.cloudText}>
                    avec leur
                    <br /> famille,
                  </p>
                </div>
              </div>
              {/* Bloc 4 : nuage à gauche, image à droite */}
              <div className={styles.block}>
                <div className={styles.cloudContainer}>
                  <p className={styles.cloudText}>
                    et avec <br />
                    leurs amis…
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/share-section1-img4.png"
                    alt="Moment de partage"
                    width={500}
                    height={500}
                    className={styles.blockImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
