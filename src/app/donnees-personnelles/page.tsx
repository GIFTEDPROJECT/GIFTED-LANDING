import React from "react";
import styles from "./page.module.scss";
import StickyHeader from "../../components/StickyHeader";

export default function DonneesPersonnellesPage() {
  return (
    <>
      {/* Sticky Header */}
      <StickyHeader
        buttonLabel="← Retour"
        buttonHref="/"
        className={styles.legalHeader}
      />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Politique de Protection des Données Personnelles
          </h1>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>1. Introduction</h2>
            <p className={styles.paragraph}>
              GIFTED s&apos;engage à protéger vos données personnelles et celles
              de vos enfants. Cette politique décrit comment nous collectons,
              utilisons et protégeons vos informations conformément au Règlement
              Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>2. Responsable du traitement</h2>
            <p className={styles.paragraph}>
              GIFTED est responsable du traitement de vos données personnelles.
              Vous pouvez nous contacter à l&apos;adresse suivante :
              contact@gifted-app.com
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>3. Données collectées</h2>
            <p className={styles.paragraph}>
              Nous collectons les données suivantes :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.strong}>
                  Données d&apos;identification :
                </span>{" "}
                nom, prénom, email
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>
                  Données de l&apos;enfant :
                </span>{" "}
                prénom, âge, niveau scolaire
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>
                  Données d&apos;utilisation :
                </span>{" "}
                progression dans les parcours, temps passé
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Données techniques :</span>{" "}
                adresse IP, type d&apos;appareil, navigateur
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>4. Finalités du traitement</h2>
            <p className={styles.paragraph}>
              Vos données sont utilisées pour :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Fournir le service éducatif GIFTED
              </li>
              <li className={styles.listItem}>
                Personnaliser les parcours d&apos;apprentissage
              </li>
              <li className={styles.listItem}>
                Améliorer nos services et fonctionnalités
              </li>
              <li className={styles.listItem}>
                Assurer la sécurité et la maintenance technique
              </li>
              <li className={styles.listItem}>
                Respecter nos obligations légales
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>5. Base légale</h2>
            <p className={styles.paragraph}>
              Le traitement de vos données est fondé sur :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.strong}>Exécution du contrat :</span>{" "}
                pour fournir le service GIFTED
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Intérêt légitime :</span> pour
                améliorer nos services
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Consentement :</span> pour les
                communications marketing (optionnel)
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Obligation légale :</span> pour
                respecter la réglementation
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>6. Conservation des données</h2>
            <p className={styles.paragraph}>Vos données sont conservées :</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.strong}>Données de compte :</span>{" "}
                pendant la durée de votre abonnement + 3 ans
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>
                  Données d&apos;utilisation :
                </span>{" "}
                2 ans après la dernière activité
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Données de facturation :</span>{" "}
                10 ans (obligation comptable)
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>7. Vos droits</h2>
            <p className={styles.paragraph}>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.strong}>Droit d&apos;accès :</span>{" "}
                consulter vos données
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Droit de rectification :</span>{" "}
                corriger vos données
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>
                  Droit à l&apos;effacement :
                </span>{" "}
                supprimer vos données
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Droit à la portabilité :</span>{" "}
                récupérer vos données
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Droit d&apos;opposition :</span>{" "}
                refuser certains traitements
              </li>
              <li className={styles.listItem}>
                <span className={styles.strong}>Droit de limitation :</span>{" "}
                limiter le traitement
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>8. Sécurité</h2>
            <p className={styles.paragraph}>
              Nous mettons en œuvre des mesures de sécurité appropriées pour
              protéger vos données contre l&apos;accès non autorisé, la
              modification, la divulgation ou la destruction. Ces mesures
              incluent le chiffrement, l&apos;authentification sécurisée et la
              surveillance continue.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>9. Partage des données</h2>
            <p className={styles.paragraph}>
              Nous ne vendons jamais vos données. Nous pouvons les partager avec
              :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Nos prestataires techniques (hébergement, paiement)
              </li>
              <li className={styles.listItem}>
                Les autorités compétentes (obligation légale)
              </li>
              <li className={styles.listItem}>
                Nos partenaires éducatifs (avec votre consentement)
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>10. Cookies</h2>
            <p className={styles.paragraph}>
              Nous utilisons des cookies pour améliorer votre expérience et
              analyser l&apos;utilisation de l&apos;application. Vous pouvez
              gérer vos préférences de cookies dans les paramètres de votre
              navigateur.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>11. Contact</h2>
            <p className={styles.paragraph}>
              Pour exercer vos droits ou pour toute question sur cette
              politique, contactez-nous à : contact@gifted-app.com
            </p>
            <p className={styles.paragraph}>
              Vous pouvez également contacter la CNIL (Commission Nationale de
              l&apos;Informatique et des Libertés) si vous estimez que vos
              droits ne sont pas respectés.
            </p>
          </section>

          <p className={styles.lastUpdate}>
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </>
  );
}
