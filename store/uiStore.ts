import { create } from "zustand";

type UiState = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
