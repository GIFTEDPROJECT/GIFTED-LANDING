"use client";

import React from "react";
import styles from "./ModalHeader.module.scss";
import Image from "next/image";

interface ModalHeaderProps {
  currentStep: number;
  isStarted: boolean;
  parcoursData: Array<{
    question: string;
    answerText: string;
  }>;
  parcoursId?: number;
  onPreviousStep: () => void;
  onClose: () => void;
  titleTransition: "out" | "in" | null;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  currentStep,
  parcoursData,
  parcoursId,
  onPreviousStep,
  onClose,
  titleTransition,
  isStarted,
}) => {
  return (
    <div className={`${styles.madalHeader} ${isStarted ? styles.started : ""}`}>
      {currentStep > 0 && (
        <div className={styles.arrow} onClick={onPreviousStep}>
          <Image
            src="/images/arrow-down.png"
            alt="Retour"
            width={100}
            height={100}
          />
        </div>
      )}
      {currentStep === 0 && <div className={styles.arrowPlaceholder}></div>}
      <div
        className={`${styles.question} ${
          titleTransition === "out"
            ? styles.questionSlideOut
            : titleTransition === "in"
            ? styles.questionSlideIn
            : ""
        }`}
        style={{
          background: parcoursId
            ? `url("/assets/images/parcours/${parcoursId}/wood-question-bg.png") repeat center center`
            : 'url("/images/wood-question-bg.png") repeat center center',
        }}
      >
        <div className={styles.bird}>
          <Image src="/images/bird.png" alt="Bird" width={100} height={100} />
        </div>
        <h1>{parcoursData[currentStep]?.question || "Question"}</h1>
        <div className={styles.progress}>
          {currentStep + 1} / {parcoursData.length}
        </div>
      </div>
      <div className={styles.home} onClick={onClose}>
        <Image src="/images/home.png" alt="Bird" width={100} height={100} />
      </div>
    </div>
  );
};

export default ModalHeader;
