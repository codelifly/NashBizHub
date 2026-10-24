"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COMPARE_LIMIT } from "@/lib/constants";

type CompareState = {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        const current = get().slugs;
        if (current.includes(slug)) {
          set({ slugs: current.filter((s) => s !== slug) });
          return;
        }
        if (current.length >= COMPARE_LIMIT) return;
        set({ slugs: [...current, slug] });
      },
      remove: (slug) => set({ slugs: get().slugs.filter((s) => s !== slug) }),
      clear: () => set({ slugs: [] }),
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "nbh-compare-slugs" },
  ),
);
