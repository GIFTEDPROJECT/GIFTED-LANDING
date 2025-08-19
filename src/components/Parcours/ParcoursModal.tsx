"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./ParcoursModal.module.scss";
import Image from "next/image";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import FinalStep from "./FinalStep";
import FooterParcours from "./FooterParcours";
import ModalHeader from "./ModalHeader";
import { Parcours, defaultParcours } from "./mocks/parcoursData";

import IntroStep from "./IntroStep";

interface ParcoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParcoursModal: React.FC<ParcoursModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Utilise le parcours par défaut (hygiène)
  const parcours = defaultParcours;
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [titleTransition, setTitleTransition] = useState(false);
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Refs pour les objets audio
  const yesSoundRef = useRef<HTMLAudioElement | null>(null);
  const noSoundRef = useRef<HTMLAudioElement | null>(null);
  const prevStepSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialiser les objets audio une seule fois
  useEffect(() => {
    if (typeof window !== "undefined") {
      yesSoundRef.current = new Audio("/images/yes.wav");
      noSoundRef.current = new Audio("/images/no.wav");
      prevStepSoundRef.current = new Audio("/images/prev-step.wav");

      const music = new Audio("/images/sound.flac");
      music.loop = true;
      music.volume = 0.3;
      backgroundMusicRef.current = music;
    }
  }, []);

  // Gérer la musique de fond selon l'état du modal
  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isOpen && !isMuted) {
        if (backgroundMusicRef.current.paused) {
          backgroundMusicRef.current.play().catch((error) => {
            console.log("Erreur lors du démarrage de la musique:", error);
          });
        }
      } else if (!isOpen) {
        // Arrêter la musique quand le modal se ferme
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    }
  }, [isOpen, isMuted]);

  if (!isOpen) return null;

  // Fonction pour jouer un son avec vérification du mute
  const playSound = (audio: HTMLAudioElement | null) => {
    if (audio && !isMuted) {
      audio.play().catch((error) => {
        console.log("Erreur lors de la lecture audio:", error);
      });
    }
  };

  // Fonction pour toggle le mute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (backgroundMusicRef.current) {
      if (newMutedState) {
        // Muter en mettant le volume à 0
        backgroundMusicRef.current.volume = 0;
      } else {
        // Remettre le volume normal et s'assurer que la musique joue
        backgroundMusicRef.current.volume = 0.3;
        if (backgroundMusicRef.current.paused) {
          backgroundMusicRef.current.play().catch((error) => {
            console.log("Erreur lors de la reprise de la musique:", error);
          });
        }
      }
    }
  };

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);

    // Jouer le son selon la réponse
    if (answer === true) {
      playSound(yesSoundRef.current);
    } else if (answer === false) {
      playSound(noSoundRef.current);
    }

    setTimeout(() => {
      let newAnswers;

      // Si on est revenu en arrière, remplacer la réponse existante
      if (currentStep < answers.length) {
        newAnswers = [...answers];
        newAnswers[currentStep] = answer;
      } else {
        // Sinon, ajouter une nouvelle réponse
        newAnswers = [...answers, answer];
      }

      setAnswers(newAnswers);

      if (currentStep < parcours.steps.length - 1) {
        // Animation de transition du titre
        setTitleTransition(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setSelectedAnswer(null);
          setTitleTransition(false);
        }, 300);
      } else {
        // Toutes les questions ont été répondues
        setShowFinalStep(true);
      }
    }, 1200);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      // Jouer le son de retour
      playSound(prevStepSoundRef.current);

      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      // On garde toutes les réponses pour permettre la modification
    }
  };

  const resetForm = () => {
    setShowIntro(true);
    setCurrentStep(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTitleTransition(false);
    setShowFinalStep(false);
    setIsMuted(false);
  };

  const handleClose = () => {
    // Arrêter la musique de fond quand on ferme la popin
    console.log("close");
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
    resetForm();
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${
          !showIntro ? styles.started : null
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <IntroStep onStart={() => setShowIntro(false)} isStarted={showIntro} />

        {/* Bouton mute en bas à gauche */}
        <div
          className={styles.muteButton}
          onClick={() => {
            toggleMute();
          }}
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </div>

        <>
          {!showFinalStep && (
            <ModalHeader
              currentStep={currentStep}
              parcoursData={parcours.steps}
              onPreviousStep={handlePreviousStep}
              onClose={handleClose}
              titleTransition={titleTransition}
              isStarted={!showIntro}
            />
          )}

          {!showFinalStep ? (
            <>
              <div className={styles.modalContentInner}>
                <div className={styles.avatarContainer}>
                  <Image
                    src="/images/moving-lion.gif"
                    alt="Avatar"
                    width={426}
                    height={426}
                    style={{
                      width: "150px",
                      height: "auto",
                    }}
                  />
                </div>
                <div
                  className={`${styles.answerContainer} ${
                    selectedAnswer !== null ? styles.answerSelected : ""
                  }`}
                >
                  <div
                    className={`${styles.answer} ${
                      selectedAnswer === false ? styles.selected : ""
                    } ${selectedAnswer === true ? styles.hiding : ""} ${
                      !showIntro ? styles.started : ""
                    }`}
                    onClick={
                      selectedAnswer === null
                        ? () => handleAnswer(false)
                        : undefined
                    }
                    style={{
                      cursor: selectedAnswer === null ? "pointer" : "default",
                    }}
                  >
                    <div className={styles.answerItem}>
                      <Image
                        src="/images/feuille-no.png"
                        alt="Toothbrush"
                        width={334}
                        height={116}
                        style={{
                          width: "160px",
                          height: "auto",
                        }}
                      />
                      <div className={`${styles.answerText} ${styles.no}`}>
                        Non
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.answer} ${
                      selectedAnswer === true ? styles.selected : ""
                    } ${selectedAnswer === false ? styles.hiding : ""} ${
                      !showIntro ? styles.started : ""
                    }`}
                    onClick={
                      selectedAnswer === null
                        ? () => handleAnswer(true)
                        : undefined
                    }
                    style={{
                      cursor: selectedAnswer === null ? "pointer" : "default",
                    }}
                  >
                    <div className={styles.answerItem}>
                      <Image
                        src="/images/feuille-yes.png"
                        alt="Toothbrush"
                        width={334}
                        height={116}
                        style={{
                          width: "160px",
                          height: "auto",
                        }}
                      />
                      <div className={`${styles.answerText} ${styles.yes}`}>
                        Oui
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <FinalStep onClose={handleClose} />
          )}
          {!showFinalStep && (
            <FooterParcours
              isStarted={!showIntro}
              parcoursData={parcours.steps}
              answers={answers}
              currentStep={currentStep}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default ParcoursModal;
