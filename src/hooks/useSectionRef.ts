"use client";

import { useRef, useEffect } from "react";
import { useSectionRefs } from "@/contexts/SectionRefsContext";

export const useSectionRef = (id: string) => {
  const ref = useRef<HTMLElement>(null);
  const { registerSection } = useSectionRefs();

  useEffect(() => {
    registerSection(id, ref.current);
    return () => registerSection(id, null);
  }, [id, registerSection]);

  return ref;
};
