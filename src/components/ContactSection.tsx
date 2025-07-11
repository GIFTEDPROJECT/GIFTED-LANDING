"use client";

import React, { useState } from "react";
import styles from "./ContactSection.module.scss";
import Image from "next/image";

export const ContactSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
  
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        const errorMessage =
          data?.error || `Erreur HTTP ${res.status}` || "Erreur inconnue";
        console.error("Erreur d'inscription :", errorMessage);
        setStatus("error");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Erreur réseau :", error.message || error);
      setStatus("error");
    }
  };
  

  return (
    <section className={styles.contactSection}>
      <div className={styles.birds}>
        <Image
          src="/images/birds.png"
          alt="Oiseaux GIFTED"
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
      <div className={styles.container}>
        <div className={styles.frame}>
          <div className={styles.content}>
            <h2 className={styles.title}>On garde le contact ?</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre e-mail"
                  required
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                ENVOYER
              </button>

              {status === "success" && (
                <p style={{ color: "white", marginTop: "10px" }}>
                  🎉 Inscription réussie ! Merci beaucoup.
                </p>
              )}

              {status === "error" && (
                <p style={{ color: "white", marginTop: "10px" }}>
                  ❌ Une erreur est survenue. Merci de réessayer.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
