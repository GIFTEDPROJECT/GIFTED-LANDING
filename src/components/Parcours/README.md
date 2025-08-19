# Dossier Parcours

Ce dossier contient tous les composants liés au parcours d'hygiène du modal.

## Structure

```
Parcours/
├── index.ts              # Export de tous les composants
├── ParcoursModal.tsx     # Composant principal du modal
├── ParcoursModal.module.scss
├── ModalHeader.tsx       # En-tête avec navigation
├── ModalHeader.module.scss
├── FinalStep.tsx         # Étape finale
├── FinalStep.module.scss
├── FooterParcours.tsx    # Footer avec indicateurs d'étapes
├── FooterParcours.module.scss
└── README.md            # Documentation
```

## Composants

### ParcoursModal
- **Rôle** : Composant principal du modal
- **Fonctionnalités** : Gestion de l'état, audio, navigation
- **Props** : `isOpen`, `onClose`

### ModalHeader
- **Rôle** : En-tête avec navigation et question
- **Fonctionnalités** : Flèches de retour, question actuelle, progression
- **Props** : `currentStep`, `parcoursData`, `onPreviousStep`, `onClose`, `titleTransition`

### FinalStep
- **Rôle** : Étape finale de félicitations
- **Fonctionnalités** : Message de bravo, bouton de fermeture
- **Props** : `onClose`

### FooterParcours
- **Rôle** : Footer avec indicateurs d'étapes
- **Fonctionnalités** : Affichage des étapes, animations des récompenses
- **Props** : `parcoursData`, `answers`

## Utilisation

```tsx
import { ParcoursModal } from '@/components/Parcours';

// Dans votre composant
<ParcoursModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
```

## Audio

Le modal inclut un système audio complet :
- Musique de fond (`sound.flac`)
- Bruitages pour les interactions (`yes.wav`, `no.wav`, `prev-step.wav`)
- Bouton mute/unmute
- Gestion automatique de l'audio à la fermeture 