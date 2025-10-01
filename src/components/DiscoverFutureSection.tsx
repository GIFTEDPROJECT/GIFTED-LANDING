"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSectionRef } from "@/hooks/useSectionRef";
import styles from "./DiscoverFutureSection.module.scss";

interface DiscoverFutureSectionProps {
  id?: string;
}

const DiscoverFutureSection: React.FC<DiscoverFutureSectionProps> = ({
  id,
}) => {
  const sectionRef = useSectionRef(id || "discover-future");

  return (
    <section ref={sectionRef} id={id} className={styles.discoverFutureSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Découvrez l'avenir de GIFTED</h2>
          <p className={styles.description}>
            Explorez nos projets futurs et découvrez vos enfants pourrons
            recréer le monde grâce à GIFTED.
          </p>
          <Link href="/a-venir" className={styles.discoverButton}>
            En savoir plus
          </Link>
        </div>
        <div className={styles.visual}>
          <div className={styles.icon}>
            <Image
              src="/images/bird.png"
              alt="Lion GIFTED"
              width={140}
              height={140}
              className={styles.lionImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverFutureSection;
