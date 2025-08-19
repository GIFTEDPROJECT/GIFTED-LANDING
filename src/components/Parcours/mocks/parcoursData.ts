// Types pour les parcours
export interface ParcoursStep {
  question: string;
  answerText: string;
}

export interface Parcours {
  id: string;
  title: string;
  description: string;
  steps: ParcoursStep[];
  category: 'hygiene' | 'devoirs' | 'respect' | 'rangement';
  difficulty: 'facile' | 'moyen' | 'difficile';
  estimatedDuration: number; // en minutes
  rewards: {
    giftPoints: number;
    badge?: string;
  };
}

// Parcours d'hygiène (actuel)
export const hygieneParcours: Parcours = {
  id: 'hygiene-daily',
  title: 'Défi Hygiène Quotidienne',
  description: 'Valide tes bonnes habitudes d\'hygiène quotidienne',
  category: 'hygiene',
  difficulty: 'facile',
  estimatedDuration: 5,
  rewards: {
    giftPoints: 50,
    badge: 'hygiene-master'
  },
  steps: [
    {
      question: "T'es-tu brossé les dents ce matin ?",
      answerText: "Dents",
    },
    {
      question: "T'es tu douché aujourd'hui ?",
      answerText: "Douche",
    },
    {
      question: "T'es-tu démêlé et coiffé les cheveux aujourd'hui ?",
      answerText: "Cheveux",
    },
    {
      question: "T'es-tu lavé les mains avant chaque repas et après chaque passage aux toilettes ?",
      answerText: "Mains",
    },
    {
      question: "As-tu gardé tes vêtements propres aujourd'hui ?",
      answerText: "Vêtements",
    },
  ],
};

// Parcours de devoirs (exemple)
export const devoirsParcours: Parcours = {
  id: 'devoirs-homework',
  title: 'Défi Devoirs du Soir',
  description: 'Organise et réalise tes devoirs efficacement',
  category: 'devoirs',
  difficulty: 'moyen',
  estimatedDuration: 10,
  rewards: {
    giftPoints: 75,
    badge: 'homework-hero'
  },
  steps: [
    {
      question: "As-tu préparé ton espace de travail ?",
      answerText: "Espace",
    },
    {
      question: "As-tu sorti tous tes cahiers et livres ?",
      answerText: "Matériel",
    },
    {
      question: "As-tu commencé par les devoirs les plus difficiles ?",
      answerText: "Priorité",
    },
    {
      question: "As-tu fait une pause de 5 minutes toutes les 30 minutes ?",
      answerText: "Pauses",
    },
    {
      question: "As-tu rangé ton bureau après tes devoirs ?",
      answerText: "Rangement",
    },
  ],
};

// Parcours de respect (exemple)
export const respectParcours: Parcours = {
  id: 'respect-family',
  title: 'Défi Respect en Famille',
  description: 'Montre du respect envers ta famille',
  category: 'respect',
  difficulty: 'facile',
  estimatedDuration: 3,
  rewards: {
    giftPoints: 30,
    badge: 'respect-champion'
  },
  steps: [
    {
      question: "As-tu dit bonjour à tes parents ce matin ?",
      answerText: "Salutations",
    },
    {
      question: "As-tu dit merci quand on t'a aidé ?",
      answerText: "Remerciements",
    },
    {
      question: "As-tu écouté sans interrompre quand on te parlait ?",
      answerText: "Écoute",
    },
    {
      question: "As-tu demandé la permission avant de prendre quelque chose ?",
      answerText: "Permission",
    },
    {
      question: "As-tu aidé un membre de ta famille aujourd'hui ?",
      answerText: "Entraide",
    },
  ],
};

// Parcours de rangement (exemple)
export const rangementParcours: Parcours = {
  id: 'rangement-room',
  title: 'Défi Rangement de Chambre',
  description: 'Garde ta chambre propre et organisée',
  category: 'rangement',
  difficulty: 'moyen',
  estimatedDuration: 8,
  rewards: {
    giftPoints: 60,
    badge: 'clean-room-expert'
  },
  steps: [
    {
      question: "As-tu fait ton lit ce matin ?",
      answerText: "Lit",
    },
    {
      question: "As-tu rangé tes vêtements dans l'armoire ?",
      answerText: "Vêtements",
    },
    {
      question: "As-tu mis tes jouets à leur place ?",
      answerText: "Jouets",
    },
    {
      question: "As-tu vidé ta poubelle si elle était pleine ?",
      answerText: "Poubelle",
    },
    {
      question: "As-tu rangé ton bureau et tes affaires d'école ?",
      answerText: "Bureau",
    },
  ],
};

// Collection de tous les parcours
export const allParcours: Parcours[] = [
  hygieneParcours,
  devoirsParcours,
  respectParcours,
  rangementParcours,
];

// Fonction pour récupérer un parcours par ID
export const getParcoursById = (id: string): Parcours | undefined => {
  return allParcours.find(parcours => parcours.id === id);
};

// Fonction pour récupérer les parcours par catégorie
export const getParcoursByCategory = (category: Parcours['category']): Parcours[] => {
  return allParcours.filter(parcours => parcours.category === category);
};

// Fonction pour récupérer les parcours par difficulté
export const getParcoursByDifficulty = (difficulty: Parcours['difficulty']): Parcours[] => {
  return allParcours.filter(parcours => parcours.difficulty === difficulty);
};

// Parcours par défaut (pour compatibilité)
export const defaultParcours = hygieneParcours; 