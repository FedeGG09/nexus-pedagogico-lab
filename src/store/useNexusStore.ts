import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DUAProfile = "tdah" | "visual" | "altas-capacidades";
export type ModuleId = "dashboard" | "prisma" | "matriz" | "simulador" | "genograma";
export type LensType = "visual" | "narrativa" | "evaluativa";

interface NexusState {
  // Navigation
  activeModule: ModuleId;
  setActiveModule: (m: ModuleId) => void;

  // Selected author
  selectedAuthorId: string | null;
  setSelectedAuthorId: (id: string | null) => void;

  // Module A: Prisma
  selectedLens: LensType | null;
  setSelectedLens: (l: LensType | null) => void;

  // Module B: Matriz
  matrizAuthor1: string | null;
  matrizAuthor2: string | null;
  setMatrizAuthor1: (id: string | null) => void;
  setMatrizAuthor2: (id: string | null) => void;

  // Module C: Simulador
  simuladorAuthorId: string | null;
  simuladorContent: string;
  setSimuladorAuthorId: (id: string | null) => void;
  setSimuladorContent: (c: string) => void;

  // Module D: DUA
  duaProfiles: DUAProfile[];
  toggleDUA: (p: DUAProfile) => void;

  // Session progress
  consultedAuthors: string[];
  addConsultedAuthor: (id: string) => void;
  quizScores: Record<string, number>;
  setQuizScore: (authorId: string, score: number) => void;
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      activeModule: "dashboard",
      setActiveModule: (m) => set({ activeModule: m }),

      selectedAuthorId: null,
      setSelectedAuthorId: (id) => set({ selectedAuthorId: id }),

      selectedLens: null,
      setSelectedLens: (l) => set({ selectedLens: l }),

      matrizAuthor1: null,
      matrizAuthor2: null,
      setMatrizAuthor1: (id) => set({ matrizAuthor1: id }),
      setMatrizAuthor2: (id) => set({ matrizAuthor2: id }),

      simuladorAuthorId: null,
      simuladorContent: "",
      setSimuladorAuthorId: (id) => set({ simuladorAuthorId: id }),
      setSimuladorContent: (c) => set({ simuladorContent: c }),

      duaProfiles: [],
      toggleDUA: (p) =>
        set((s) => ({
          duaProfiles: s.duaProfiles.includes(p)
            ? s.duaProfiles.filter((x) => x !== p)
            : [...s.duaProfiles, p],
        })),

      consultedAuthors: [],
      addConsultedAuthor: (id) =>
        set((s) => ({
          consultedAuthors: s.consultedAuthors.includes(id)
            ? s.consultedAuthors
            : [...s.consultedAuthors, id],
        })),

      quizScores: {},
      setQuizScore: (authorId, score) =>
        set((s) => ({ quizScores: { ...s.quizScores, [authorId]: score } })),
    }),
    { name: "nexus-pedagogico-session" }
  )
);
