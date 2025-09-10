"use client";

import React from "react";
import styles from "./FinalStep.module.scss";

interface FinalStepProps {
  onClose: () => void;
}

export const FinalStep: React.FC<FinalStepProps> = ({ onClose }) => {
  return (
    <div className={styles.finalStep}>
      <div className={styles.finalMessage}>
        <h2>Bravo !</h2>
        <p>
          Valide tes réponses avec tes parents et récupèrent tes Gift points !
        </p>
        <button className={styles.finalButton} onClick={onClose}>
          Terminer
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
