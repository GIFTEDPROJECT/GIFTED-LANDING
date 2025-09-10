"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./ParcoursModal.module.scss";
import Image from "next/image";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import FinalStep from "./FinalStep";
import FooterParcours from "./FooterParcours";
import ModalHeader from "./ModalHeader";
import { Parcours, defaultParcours } from "./mocks/parcoursData";
import { getParcoursConfig, ParcoursConfig } from "../../config/parcoursSimple";

import IntroStep from "./IntroStep";

interface ParcoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcoursId?: number; // ID du parcours à charger
}

export const ParcoursModal: React.FC<ParcoursModalProps> = ({
  isOpen,
  onClose,
  parcoursId = 1, // Par défaut, parcours 1 (hygiène)
}) => {
  // Charger la config du parcours selon l'ID
  const parcoursConfig = getParcoursConfig(parcoursId);
  const parcours = parcoursConfig
    ? {
        id: parcoursConfig.id.toString(),
        title: parcoursConfig.title,
        description: parcoursConfig.description || "",
        steps: parcoursConfig.steps.map((step) => ({
          question: step.question,
          answerText: step.answerText,
        })),
      }
    : defaultParcours;

  // Reset complet quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [titleTransition, setTitleTransition] = useState(false);
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showGiftMoneyIndex, setShowGiftMoneyIndex] = useState<number | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLionJumping, setIsLionJumping] = useState(false);
  const [isLionReturning, setIsLionReturning] = useState(false);
  const [isLionInBottom, setIsLionInBottom] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Refs pour les objets audio
  const yesSoundRef = useRef<HTMLAudioElement | null>(null);
  const noSoundRef = useRef<HTMLAudioElement | null>(null);
  const prevStepSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const gainSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialiser les objets audio une seule fois
  useEffect(() => {
    if (typeof window !== "undefined") {
      yesSoundRef.current = new Audio("/images/yes.wav");
      noSoundRef.current = new Audio("/images/no.wav");
      prevStepSoundRef.current = new Audio("/images/prev-step.wav");
      gainSoundRef.current = new Audio("/images/gain.mp3");

      console.log(parcoursConfig?.backgroundMusic);

      // Utiliser la musique de fond de la config ou p1.mp3 par défaut
      const musicFile = parcoursConfig?.backgroundMusic;
      const music = new Audio(`${musicFile}`);
      music.loop = true;
      music.volume = 0.3;
      backgroundMusicRef.current = music;
    }
  }, [parcoursConfig]);

  // Appliquer la couleur principale du parcours
  useEffect(() => {
    if (parcoursConfig?.primaryColor) {
      const root = document.documentElement;
      root.style.setProperty(
        "--parcours-primary-color",
        parcoursConfig.primaryColor
      );
    }

    // Debug: afficher le chemin de l'image
    if (parcoursConfig) {
      console.log(
        `Background image path: /assets/images/parcours/${parcoursConfig.id}/background.png`
      );
    }
  }, [parcoursConfig]);

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
    // Empêcher les clics pendant la transition
    if (isTransitioning) return;

    // Démarrer la transition
    setIsTransitioning(true);

    // Faire sauter le lion
    setIsLionJumping(true);

    // Centrer la réponse sélectionnée
    setSelectedAnswer(answer);

    // Jouer le son
    if (answer === true) {
      playSound(gainSoundRef.current);
    } else if (answer === false) {
      playSound(noSoundRef.current);
    }

    // Enregistrer la réponse
    let newAnswers;
    if (currentStep < answers.length) {
      newAnswers = [...answers];
      newAnswers[currentStep] = answer;
    } else {
      newAnswers = [...answers, answer];
    }
    setAnswers(newAnswers);

    // Afficher le gift money si "Oui"
    if (answer === true) {
      setShowGiftMoneyIndex(currentStep);
    }

    // Arrêter l'animation du lion après 0.8 seconde
    setTimeout(() => {
      setIsLionJumping(false);
      setIsLionInBottom(true);
      // Le lion reste en bas pendant 500ms avant de repartir
      setTimeout(() => {
        setIsLionInBottom(false);
        setIsLionReturning(true);
        // Arrêter l'animation de retour après 0.6 seconde
        setTimeout(() => {
          setIsLionReturning(false);
        }, 600);
      }, 500);
    }, 800);

    // Pause de 3 secondes avec le nénuphare au centre, puis passer à l'étape suivante
    if (currentStep < parcours.steps.length - 1) {
      setTimeout(() => {
        setTitleTransition(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setTitleTransition(false);
          setSelectedAnswer(null); // Réinitialiser la sélection
          setIsTransitioning(false); // Fin de la transition
          // S'assurer que le lion est bien revenu à sa position initiale
          setIsLionJumping(false);
          setIsLionReturning(false);
          setIsLionInBottom(false);
        }, 500);
      }, 3000); // Pause de 3 secondes
    } else {
      setTimeout(() => {
        setShowFinalStep(true);
        setIsTransitioning(false); // Fin de la transition
        // S'assurer que le lion est bien revenu à sa position initiale
        setIsLionJumping(false);
        setIsLionReturning(false);
        setIsLionInBottom(false);
      }, 3000); // Pause de 3 secondes avant la fin
    }
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
    setShowGiftMoneyIndex(null);
    setIsTransitioning(false);
    setIsLionJumping(false);
    setIsLionReturning(false);
    setIsLionInBottom(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    // Attendre la fin de l'animation avant de fermer
    setTimeout(() => {
      // Arrêter la musique de fond quand on ferme la popin
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
      onClose();
      setIsClosing(false);
    }, 600); // Durée de l'animation de fermeture
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${
          !showIntro ? styles.started : null
        } ${isClosing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: parcoursConfig
            ? `url(/assets/images/parcours/${parcoursConfig.id}/background.png)`
            : "url(/images/hygiene.png)",
        }}
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
              parcoursId={parcoursConfig?.id}
              onPreviousStep={handlePreviousStep}
              onClose={handleClose}
              titleTransition={titleTransition}
              isStarted={!showIntro}
            />
          )}

          {!showFinalStep ? (
            <>
              <div className={styles.modalContentInner}>
                <div
                  className={`${styles.avatarContainer} ${
                    isLionJumping ? styles.jumping : ""
                  } ${isLionInBottom ? styles.inBottom : ""} ${
                    isLionReturning ? styles.returning : ""
                  }`}
                >
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
                      selectedAnswer === null && !isTransitioning
                        ? () => handleAnswer(false)
                        : undefined
                    }
                    style={{
                      cursor:
                        selectedAnswer === null && !isTransitioning
                          ? "pointer"
                          : "default",
                    }}
                  >
                    <div className={styles.answerItem}>
                      <Image
                        src={`/assets/images/parcours/${parcoursConfig?.id}/no.png`}
                        alt="Toothbrush"
                        width={334}
                        height={116}
                        style={{
                          width: "120px",
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
                      selectedAnswer === null && !isTransitioning
                        ? () => handleAnswer(true)
                        : undefined
                    }
                    style={{
                      cursor:
                        selectedAnswer === null && !isTransitioning
                          ? "pointer"
                          : "default",
                    }}
                  >
                    <div className={styles.answerItem}>
                      <Image
                        src={`/assets/images/parcours/${parcoursConfig?.id}/yes.png`}
                        alt="Toothbrush"
                        width={334}
                        height={116}
                        style={{
                          width: "120px",
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
              showGiftMoneyIndex={showGiftMoneyIndex}
              parcoursId={parcoursConfig?.id}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default ParcoursModal;
