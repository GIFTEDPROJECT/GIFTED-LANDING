import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollProgressOptions {
  throttleMs?: number;
  passive?: boolean;
}

export const useScrollProgress = (options: UseScrollProgressOptions = {}) => {
  const { throttleMs = 16, passive = true } = options;
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const elementRef = useRef<HTMLElement>(null);

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

  const handleScroll = useCallback(
    throttle(() => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculer le progrès de scroll (0 à 1)
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      setScrollProgress(progress);
    }, throttleMs),
    [throttle, throttleMs]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, passive]);

  return { scrollProgress, elementRef };
};
