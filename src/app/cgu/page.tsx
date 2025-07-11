import React from "react";
import styles from "./page.module.scss";
import StickyHeader from "../../components/StickyHeader";

export default function CGUPage() {
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
            Conditions Générales d&apos;Utilisation
          </h1>

          <p className={styles.version}>Version en vigueur au 25 juin 2025</p>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>1. Présentation du service</h2>
            <p className={styles.paragraph}>
              GIFTED est une application éducative innovante conçue pour
              accompagner les enfants et leurs parents dans l&apos;apprentissage
              et l&apos;autonomie au quotidien. À travers des parcours ludiques
              et personnalisés, fondés sur des données scientifiques à fort
              niveau de preuve (thérapie motivationnelle), GIFTED vise à rendre
              l&apos;éducation plus engageante, constructive et bienveillante.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>2. Acceptation des conditions</h2>
            <p className={styles.paragraph}>
              En accédant à l&apos;application GIFTED, vous reconnaissez avoir
              lu, compris et accepté sans réserve les présentes Conditions
              Générales d&apos;Utilisation (CGU). Si vous êtes en désaccord avec
              tout ou partie de ces conditions, nous vous invitons à ne pas
              utiliser le service.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>3. Utilisation du service</h2>
            <p className={styles.paragraph}>
              L&apos;application est strictement réservée à un usage personnel,
              éducatif et non commercial. En l&apos;utilisant, vous vous engagez
              à :
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Respecter l&apos;usage prévu de l&apos;application à des fins
                éducatives et ludiques ;
              </li>
              <li className={styles.listItem}>
                Ne pas divulguer vos identifiants à des tiers ;
              </li>
              <li className={styles.listItem}>
                Ne pas compromettre la sécurité ou la stabilité du service ;
              </li>
              <li className={styles.listItem}>
                Ne pas copier, reproduire, ou distribuer tout contenu protégé
                sans autorisation préalable.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>4. Abonnements et paiements</h2>
            <p className={styles.paragraph}>
              GIFTED propose plusieurs formules d&apos;abonnement : CONFIANTS,
              SUPPORTERS, CREATEURS, chacune donnant accès à des fonctionnalités
              spécifiques.
            </p>
            <p className={styles.paragraph}>
              Les abonnements sont souscrits pour une durée d&apos;un (1) an,
              avec reconduction tacite. Vous pouvez mettre fin au renouvellement
              automatique à tout moment via votre espace personnel ou en nous
              contactant.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>5. Données personnelles</h2>
            <p className={styles.paragraph}>
              La protection de vos données est essentielle pour nous. GIFTED
              collecte et traite vos informations personnelles en conformité
              avec le Règlement Général sur la Protection des Données (RGPD).
              Pour en savoir plus, veuillez consulter notre Politique de
              confidentialité.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>6. Responsabilité</h2>
            <p className={styles.paragraph}>
              Nous mettons tout en œuvre pour assurer la qualité, la sécurité et
              la disponibilité de nos services. Toutefois, GIFTED ne peut être
              tenu responsable des interruptions temporaires, anomalies ou
              pertes de données liées à l&apos;utilisation du service, ni des
              dommages indirects qui pourraient en résulter.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>7. Modification des CGU</h2>
            <p className={styles.paragraph}>
              Les présentes CGU peuvent être mises à jour à tout moment. Toute
              modification fera l&apos;objet d&apos;une notification aux
              utilisateurs via l&apos;application ou par e-mail. Les nouvelles
              conditions s&apos;appliqueront dès leur publication.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>8. Contact</h2>
            <p className={styles.paragraph}>
              Pour toute question, suggestion ou réclamation concernant ces
              conditions, vous pouvez nous écrire à :
            </p>
            <p className={styles.contact}>📧 contact@gifted-project.ch</p>
          </section>

          <p className={styles.lastUpdate}>
            Dernière mise à jour : 25 juin 2025
          </p>
        </div>
      </div>
    </>
  );
}
