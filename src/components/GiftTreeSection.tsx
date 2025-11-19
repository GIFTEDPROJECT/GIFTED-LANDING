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
        <h2 className={styles.sectionTitle}>
          Un album photo de ses moments de partage...
        </h2>
        <div className={styles.imageContainer}>
          <Image
            src="/images/tree-content.png"
            alt="Gift Points - Album photo"
            width={1200}
            height={800}
            className={styles.treeContentImage}
          />
        </div>
        <div className={styles.contentBlock}>
          <p className={styles.text}>
            C’est ainsi que vous offrez à votre enfant un cadeau pour la vie...
          </p>
        </div>
      </div>
    </section>
  );
};

export default GiftTreeSection;
