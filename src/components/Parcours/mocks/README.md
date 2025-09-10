# Système de Mock des Parcours

Ce dossier contient le système de mock pour gérer plusieurs parcours différents dans l'application GIFTED.

## Utilisation Actuelle

Le système utilise actuellement le **parcours hygiène par défaut** qui s'ouvre directement quand on clique sur "Découvrir un parcours" dans la section Savoirs.

## Structure

### `parcoursData.ts`
Fichier principal contenant :
- **Types TypeScript** : `ParcoursStep`, `Parcours`
- **Parcours prédéfinis** : 4 parcours différents (hygiène, devoirs, respect, rangement)
- **Fonctions utilitaires** : pour récupérer et filtrer les parcours

## Types

### `ParcoursStep`
```typescript
interface ParcoursStep {
  question: string;
  answerText: string;
}
```

### `Parcours`
```typescript
interface Parcours {
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
```

## Parcours Disponibles

### 1. **Hygiène Quotidienne** (`hygiene-daily`) - **PARCOURS ACTUEL**
- **Catégorie** : Hygiène
- **Difficulté** : Facile
- **Durée** : 5 minutes
- **Récompense** : 50 points + badge "hygiene-master"
- **Questions** : 5 questions sur l'hygiène quotidienne

### 2. **Devoirs du Soir** (`devoirs-homework`)
- **Catégorie** : Devoirs
- **Difficulté** : Moyen
- **Durée** : 10 minutes
- **Récompense** : 75 points + badge "homework-hero"
- **Questions** : 5 questions sur l'organisation des devoirs

### 3. **Respect en Famille** (`respect-family`)
- **Catégorie** : Respect
- **Difficulté** : Facile
- **Durée** : 3 minutes
- **Récompense** : 30 points + badge "respect-champion"
- **Questions** : 5 questions sur le respect familial

### 4. **Rangement de Chambre** (`rangement-room`)
- **Catégorie** : Rangement
- **Difficulté** : Moyen
- **Durée** : 8 minutes
- **Récompense** : 60 points + badge "clean-room-expert"
- **Questions** : 5 questions sur le rangement

## Fonctions Utilitaires

### `getParcoursById(id: string)`
Récupère un parcours spécifique par son ID.

### `getParcoursByCategory(category: string)`
Filtre les parcours par catégorie.

### `getParcoursByDifficulty(difficulty: string)`
Filtre les parcours par niveau de difficulté.

### `allParcours`
Array contenant tous les parcours disponibles.

### `defaultParcours`
Parcours par défaut (hygiène) utilisé actuellement.

## Utilisation Actuelle

### Dans ParcoursModal
```typescript
import { defaultParcours } from './mocks/parcoursData';

// Le parcours hygiène est utilisé par défaut
const parcours = defaultParcours;
```

### Changer de parcours
Pour utiliser un autre parcours, il suffit de modifier dans `ParcoursModal.tsx` :
```typescript
// Au lieu de :
const parcours = defaultParcours;

// Utiliser :
const parcours = getParcoursById('devoirs-homework');
// ou
const parcours = getParcoursById('respect-family');
// ou
const parcours = getParcoursById('rangement-room');
```

## Avantages du Système

1. **Modularité** : Chaque parcours est indépendant
2. **Extensibilité** : Facile d'ajouter de nouveaux parcours
3. **Type Safety** : TypeScript garantit la cohérence des données
4. **Filtrage** : Fonctions utilitaires pour filtrer les parcours
5. **Compatibilité** : Parcours par défaut pour la rétrocompatibilité
6. **Simplicité** : Fonctionnement actuel inchangé, données externalisées

## Évolution Future

- **API Integration** : Remplacer les mocks par des appels API
- **Base de données** : Stocker les parcours en base
- **Parcours dynamiques** : Permettre la création de parcours personnalisés
- **Analytics** : Suivre les performances des parcours
- **Sélecteur de parcours** : Interface pour choisir entre différents parcours 