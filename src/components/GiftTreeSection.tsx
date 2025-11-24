"use client";

import React from "react";
import { useSectionRef } from "@/hooks/useSectionRef";
import Image from "next/image";
import styles from "./GiftTreeSection.module.scss";

interface GiftTreeSectionProps {
  id?: string;
}

export const GiftTreeSection: React.FC<GiftTreeSectionProps> = ({ id }) => {
  const sectionRef = useSectionRef(id || "gift-tree");

  return (
    <section ref={sectionRef} id={id} className={styles.giftTreeSection}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>La photo synthèse !</h2>
        <div className={styles.contentBlock}>
          <p className={styles.textBold}>
            Un album photo de tous ses moments de partage
          </p>
          <p className={styles.text}>
            Et c’est ainsi que vous offrez à votre enfant un cadeau pour la
            vie...
          </p>
        </div>
      </div>
    </section>
  );
};

export default GiftTreeSection;
