import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      panelName: "Admin Dashboard",
      colorPalette: "blue", // blue, purple, green, red, orange, pink
      sidebarWidth: "normal", // normal, compact, wide
      itemsPerPage: 10,
      notifications: true,
      autoSave: true,

      // Color palettes
      colorPalettes: {
        blue: {
          primary: "blue",
          gradient: "from-blue-500 to-blue-600",
          light: "bg-blue-50",
          dark: "dark:bg-blue-900",
          text: "text-blue-600",
        },
        purple: {
          primary: "purple",
          gradient: "from-purple-500 to-purple-600",
          light: "bg-purple-50",
          dark: "dark:bg-purple-900",
          text: "text-purple-600",
        },
        green: {
          primary: "green",
          gradient: "from-green-500 to-green-600",
          light: "bg-green-50",
          dark: "dark:bg-green-900",
          text: "text-green-600",
        },
        red: {
          primary: "red",
          gradient: "from-red-500 to-red-600",
          light: "bg-red-50",
          dark: "dark:bg-red-900",
          text: "text-red-600",
        },
        orange: {
          primary: "orange",
          gradient: "from-orange-500 to-orange-600",
          light: "bg-orange-50",
          dark: "dark:bg-orange-900",
          text: "text-orange-600",
        },
        pink: {
          primary: "pink",
          gradient: "from-pink-500 to-pink-600",
          light: "bg-pink-50",
          dark: "dark:bg-pink-900",
          text: "text-pink-600",
        },
      },

      setPanelName: (name) => set({ panelName: name }),
      setColorPalette: (palette) => set({ colorPalette: palette }),
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      setItemsPerPage: (items) => set({ itemsPerPage: items }),
      setNotifications: (enabled) => set({ notifications: enabled }),
      setAutoSave: (enabled) => set({ autoSave: enabled }),
    }),
    {
      name: "settings-storage",
    }
  )
);
