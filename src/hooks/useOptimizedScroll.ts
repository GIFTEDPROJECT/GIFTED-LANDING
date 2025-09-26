import { useRef, useCallback, useEffect, useState } from 'react';

interface UseOptimizedScrollOptions {
  throttleMs?: number;
  passive?: boolean;
  onProgressChange?: (progress: number) => void;
}

export const useOptimizedScroll = (options: UseOptimizedScrollOptions = {}) => {
  const { throttleMs = 16, passive = true, onProgressChange } = options;
  
  // Refs pour éviter les re-renders
  const elementRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);
  const isTopContentHiddenRef = useRef<boolean>(false);
  
  // États minimaux pour les re-renders nécessaires
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Throttle function optimisée
  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return (...args: any[]) => {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Gestion du scroll optimisée
  const handleScroll = useCallback(
    throttle(() => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculer le progrès de scroll (0 à 1)
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      
      // Mettre à jour les refs (pas de re-render)
      scrollProgressRef.current = progress;
      isVisibleRef.current = progress > 0.3;
      isTopContentHiddenRef.current = progress > 0.8;
      
      // Mettre à jour l'état seulement si le changement est significatif
      if (Math.abs(progress - scrollProgress) > 0.01) {
        setScrollProgress(progress);
      }
      
      // Toujours appeler le callback pour les actions directes
      onProgressChange?.(progress);
    }, throttleMs),
    [throttle, scrollProgress, onProgressChange, throttleMs]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, passive]);

  return {
    elementRef,
    scrollProgress,
    // Getters pour accéder aux valeurs des refs
    getScrollProgress: () => scrollProgressRef.current,
    getIsVisible: () => isVisibleRef.current,
    getIsTopContentHidden: () => isTopContentHiddenRef.current,
  };
};
