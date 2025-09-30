import { useRef, useEffect, useState, useCallback } from 'react';

interface UseOptimizedIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  onIntersectionChange?: (isIntersecting: boolean) => void;
}

export const useOptimizedIntersection = <T extends HTMLElement = HTMLElement>(
  options: UseOptimizedIntersectionOptions = {}
) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    freezeOnceVisible = false,
    onIntersectionChange
  } = options;
  
  // Refs pour éviter les re-renders
  const elementRef = useRef<T>(null);
  const isIntersectingRef = useRef<boolean>(false);
  const hasIntersectedRef = useRef<boolean>(false);
  
  // États minimaux pour les re-renders nécessaires
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const handleIntersection = useCallback((entry: IntersectionObserverEntry) => {
    const isElementIntersecting = entry.isIntersecting;
    
    // Mettre à jour les refs (pas de re-render)
    isIntersectingRef.current = isElementIntersecting;
    
    if (isElementIntersecting && !hasIntersectedRef.current) {
      hasIntersectedRef.current = true;
    }
    
    // Déterminer si on doit mettre à jour l'état
    const shouldUpdate = !freezeOnceVisible || !hasIntersectedRef.current;
    const finalValue = shouldUpdate ? isElementIntersecting : isIntersectingRef.current;
    
    // Mettre à jour l'état seulement si nécessaire
    if (finalValue !== isIntersecting) {
      setIsIntersecting(finalValue);
      onIntersectionChange?.(finalValue);
    }
  }, [freezeOnceVisible, isIntersecting, onIntersectionChange]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => handleIntersection(entry),
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return {
    elementRef,
    isIntersecting,
    // Getters pour accéder aux valeurs des refs
    getIsIntersecting: () => isIntersectingRef.current,
    getHasIntersected: () => hasIntersectedRef.current,
  };
};
