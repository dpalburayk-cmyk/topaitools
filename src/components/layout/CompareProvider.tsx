"use client";

import { createContext, useContext } from "react";
import { useCompare } from "@/hooks/useCompare";

type CompareContextType = ReturnType<typeof useCompare>;

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const compare = useCompare();
  return (
    <CompareContext.Provider value={compare}>{children}</CompareContext.Provider>
  );
}

export function useCompareContext() {
  const ctx = useContext(CompareContext);
  if (!ctx)
    throw new Error("useCompareContext must be used within CompareProvider");
  return ctx;
}
