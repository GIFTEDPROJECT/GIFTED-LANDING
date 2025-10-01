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
          Bravo. Une fois que ton parent aura validé tes réponses, tu pourras
          gagner tes GIFT POINTS du jour
        </p>
        <button className={styles.finalButton} onClick={onClose}>
          Terminer
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
