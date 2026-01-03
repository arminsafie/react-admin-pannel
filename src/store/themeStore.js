import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

     
      const root = document.documentElement;
      root.classList.remove(state.theme);
      root.classList.add(newTheme);

      return { theme: newTheme };
    }),
}));
