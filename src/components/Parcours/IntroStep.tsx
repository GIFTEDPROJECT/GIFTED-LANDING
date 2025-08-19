import React from "react";
import styles from "./IntroStep.module.scss";

interface IntroStepProps {
  isStarted: boolean;
  onStart: () => void;
}

const IntroStep: React.FC<IntroStepProps> = ({ onStart, isStarted }) => {
  return (
    <div className={`${styles.introStep} ${isStarted ? styles.started : ""}`}>
      <div className={styles.message}>
        <h2>Bienvenue !</h2>
        <p>Prêts pour ton défi du jour ?</p>
        <button className={styles.introButton} onClick={onStart}>
          Commencer
        </button>
      </div>
    </div>
  );
};

export default IntroStep;
