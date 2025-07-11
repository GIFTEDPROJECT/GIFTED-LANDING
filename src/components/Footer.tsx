import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Définition du dégradé Instagram */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="instagram-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

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
            <a
              href="https://www.instagram.com/meyer_gifted/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577750349548"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.facebook}
            >
              <FaFacebook />
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
