export interface ParcoursConfig {
  id: number;
  title: string;
  description?: string;
  steps: {
    question: string;
    answerText: string;
  }[];
  primaryColor: string;
  backgroundMusic?: string;
}

export const PARCOURS_CONFIGS: Record<number, ParcoursConfig> = {
  1: {
    id: 1,
    title: "Parcours Hygiène",
    description: "Apprends les bonnes habitudes d'hygiène",
    steps: [
      {
        question: "T'es-tu brossé les dents hier soir et ce matin ?",
        answerText: "Dents"
      },
      {
        question: "T'es-tu douché ?",
        answerText: "Douche"
      },
      {
        question: "T'es-tu coiffé et démêlé les cheveux ?",
        answerText: "Cheveux"
      },
      {
        question: "T'es-tu lavé les mains avant les repas, et après être passé aux toilettes ?",
        answerText: "Mains"
      },
      {
        question: "As-tu gardé tes vêtements propres aujourd'hui ?",
        answerText: "Vêtements"
      }
    ],
    primaryColor: "#4CAF50",
    backgroundMusic: "/assets/images/parcours/1/music-bg.mp3"
  },
  2: {
    id: 2,
    title: "Parcours Rangement",
    description: "Organise ton espace et tes affaires",
    steps: [
      {
        question: "As-tu débarrassé après avoir mangé ?",
        answerText: "Débarras"
      },
      {
        question: "As-tu rangé tous tes vêtements ?",
        answerText: "Vêtements"
      },
      {
        question: "As-tu rangé toutes tes affaires ?",
        answerText: "Affaires"
      },
      {
        question: "As-tu rangé ta chambre ?",
        answerText: "Chambre"
      },
      {
        question: "As-tu préparé tes affaires pour demain ?",
        answerText: "Préparation"
      }
    ],
    primaryColor: "#9C27B0",
    backgroundMusic: "/assets/images/parcours/2/music-bg.mp3"
  },
  3: {
    id: 3,
    title: "Parcours Respect",
    description: "Découvre l'importance du respect",
    steps: [
      {
        question: "As-tu réussi à ne pas dire de gros mot, d'insulte, ou de vulgarité ?",
        answerText: "Langage"
      },
      {
        question: "As-tu réussi à parler sans agressivité ni colère ?",
        answerText: "Calme"
      },
      {
        question: "As-tu réussi à parler avec respect et bienveillance ?",
        answerText: "Respect"
      },
      {
        question: "As-tu réussi à éviter tout geste violent, ou colérique ?",
        answerText: "Paix"
      },
      {
        question: "As-tu fait ou dit quelque chose de généreux ?",
        answerText: "Générosité"
      }
    ],
    primaryColor: "#2196F3",
    backgroundMusic: "/assets/images/parcours/3/music-bg.mp3"
  },
  4: {
    id: 4,
    title: "Parcours Devoirs",
    description: "Organise et réalise tes devoirs avec soin",
    steps: [
      {
        question: "As-tu inscris tous tes devoirs dans ton cahier de texte ?",
        answerText: "Organisation"
      },
      {
        question: "As-tu pris toutes les affaires nécessaires pour faire tes devoirs ?",
        answerText: "Matériel"
      },
      {
        question: "As-tu fait tes devoirs tout seul ?",
        answerText: "Autonomie"
      },
      {
        question: "Est-ce que tes devoirs sont propres ?",
        answerText: "Propreté"
      },
      {
        question: "Est-ce que tes réponses sont justes ?",
        answerText: "Exactitude"
      }
    ],
    primaryColor: "#FF9800",
    backgroundMusic: "/assets/images/parcours/4/music-bg.mp3"
  }
};

export const getParcoursConfig = (id: number): ParcoursConfig | null => {
  return PARCOURS_CONFIGS[id] || null;
};

export const getAvailableParcoursIds = (): number[] => {
  return Object.keys(PARCOURS_CONFIGS).map(Number);
};