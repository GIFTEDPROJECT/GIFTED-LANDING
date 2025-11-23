"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionRef } from "@/hooks/useSectionRef";
import Image from "next/image";
import styles from "./ShareSection.module.scss";

interface ShareSectionProps {
  id?: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ id }) => {
  const sectionRef = useSectionRef(id || "share");

  const handlePassClick = () => {
    // Scroller vers la section suivante (DonationSection)
    const nextSection = document.getElementById("donation");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section ref={sectionRef} id={id} className={styles.shareSection}>
      <div className={styles.screensContainer}>
        <div className={styles.screen}>
          <div className={styles.firstScreenContent}>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              Et grâce aux <span className={styles.highlight}>Gift Points</span>{" "}
              il choisit...
            </motion.h2>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ...des moments de partage
            </motion.p>
            <div className={styles.blocksGrid}>
              {/* Bloc 1 : image à gauche, nuage à droite */}
              <motion.div
                className={styles.block}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
              </motion.div>
              {/* Bloc 2 : nuage à gauche, image à droite */}
              <motion.div
                className={styles.block}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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
              </motion.div>
              {/* Bloc 3 : image à gauche, nuage à droite */}
              <motion.div
                className={styles.block}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
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
              </motion.div>
              {/* Bloc 4 : nuage à gauche, image à droite */}
              <motion.div
                className={styles.block}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
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
              </motion.div>
            </div>
          </div>
        </div>
        <div className={styles.secondScreen}>
          <motion.div
            className={styles.firstImageContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/share/screen2-dad.png"
              alt="Moment de partage"
              className={styles.blockImage}
            />
          </motion.div>
          <motion.div
            className={styles.cardImageContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className={styles.cardImage}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <img
                src="/images/share/screen2-card1.png"
                alt="Moment de partage"
                className={styles.cardImage}
              />
            </motion.div>
            <motion.div
              className={styles.cardImage}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <img
                src="/images/share/screen2-card2.png"
                alt="Moment de partage"
                className={styles.cardImage}
              />
            </motion.div>
            <motion.div
              className={styles.cardImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <img
                src="/images/share/screen2-card3.png"
                alt="Moment de partage"
                className={styles.cardImage}
              />
            </motion.div>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            ... et quelle activité il souhaite faire avec chacun...{" "}
          </motion.h3>
        </div>
        <div className={styles.thirdScreen}>
          <motion.div
            className={styles.peopleContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/share/screen3.png"
              alt="People"
              className={styles.peopleImage}
            />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            L'enfant choisit trois de ses proches...{" "}
          </motion.h3>
        </div>
        <div className={styles.fourthScreen}>
          <div className={styles.imageContainer}>
            <motion.div
              className={styles.image}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/images/share/screen4-dad.png"
                alt="Image"
                className={styles.image}
              />
            </motion.div>
            <motion.div
              className={styles.image}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/images/share/screen4-phone.png"
                alt="Image"
                className={styles.image}
              />
            </motion.div>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Chaque invité reçoit par Whatsapp...
          </motion.h3>
        </div>
        <div className={styles.fifthScreen}>
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/share/screen5.png"
              alt="Image"
              className={styles.image}
            />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            L'invité choisit une activité...
          </motion.h3>
        </div>
      </div>
      <div className={styles.sixthScreen}>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/share/screen6.png"
            alt="Image"
            className={styles.image}
          />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Imaginez… puis fixez la date qui le rend réel....
        </motion.h3>
      </div>
      <div className={styles.seventhScreen}>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/share/screen7.png"
            alt="Image"
            className={styles.image}
          />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Vous vivez votre moment de partage...
        </motion.h3>
      </div>
      <div className={styles.lastScreen}>
        <div className={styles.lastScreenContent}>
          <img
            src="/images/share/screen9.png"
            alt="Image"
            className={styles.image}
          />
        </div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Enfin vous téléchargez vos photos dans l’appli...
        </motion.h3>
      </div>
      <div className={styles.pass} onClick={handlePassClick}>
        Passer
      </div>
    </section>
  );
};

export default ShareSection;
