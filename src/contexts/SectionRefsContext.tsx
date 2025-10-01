"use client";

import React, { createContext, useContext, useRef, ReactNode } from "react";

interface SectionRefsContextType {
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  registerSection: (id: string, element: HTMLElement | null) => void;
}

export const SectionRefsContext = createContext<
  SectionRefsContextType | undefined
>(undefined);

export const useSectionRefs = () => {
  const context = useContext(SectionRefsContext);
  if (!context) {
    throw new Error("useSectionRefs must be used within a SectionRefsProvider");
  }
  return context;
};

interface SectionRefsProviderProps {
  children: ReactNode;
}

export const SectionRefsProvider: React.FC<SectionRefsProviderProps> = ({
  children,
}) => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const registerSection = (id: string, element: HTMLElement | null) => {
    sectionRefs.current[id] = element;
  };

  return (
    <SectionRefsContext.Provider value={{ sectionRefs, registerSection }}>
      {children}
    </SectionRefsContext.Provider>
  );
};
