import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Suivez-nous !</h2>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/company/giftedproject/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.bottom}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/logo.png"
              alt="GIFTED"
              width={120}
              height={40}
              className={styles.logo}
            />
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/cgu">Conditions Générales d&apos;Utilisation</Link>
            <Link href="/donnees-personnelles">Données Personnelles</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
