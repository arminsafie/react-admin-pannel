import { create } from "zustand";
import { persist } from "zustand/middleware";

export const DEFAULT_WIDGETS = [
  { id: "stats", title: "Stats", description: "Key metrics at a glance" },
  { id: "chart", title: "User Growth", description: "Simple growth chart" },
  {
    id: "recentArticles",
    title: "Recent Articles",
    description: "Latest published articles",
  },
  {
    id: "latestUsers",
    title: "Latest Users",
    description: "Recently registered users",
  },
  {
    id: "activeSessions",
    title: "Active Sessions",
    description: "Current active sessions",
  },
  { id: "revenue", title: "Revenue", description: "Recent revenue summary" },
  { id: "tasks", title: "Tasks", description: "Pending tasks / todos" },
  {
    id: "notifications",
    title: "Notifications",
    description: "Recent system notifications",
  },
  {
    id: "systemHealth",
    title: "System Health",
    description: "Uptime and status",
  },
  { id: "topPages", title: "Top Pages", description: "Most visited pages" },
];

export const useWidgetsStore = create(
  persist(
    (set, get) => ({
      // registry of available widget definitions
      availableWidgets: DEFAULT_WIDGETS,

      // which widgets are shown on the dashboard (order matters)
      enabledWidgets: DEFAULT_WIDGETS.map((w) => w.id),

      // toggle widget on/off
      toggleWidget: (id) =>
        set((state) => {
          const exists = state.enabledWidgets.includes(id);
          return {
            enabledWidgets: exists
              ? state.enabledWidgets.filter((w) => w !== id)
              : [...state.enabledWidgets, id],
          };
        }),

      // add custom widget definition (not used by UI yet)
      addWidget: (widget) =>
        set((state) => ({
          availableWidgets: [...state.availableWidgets, widget],
        })),

      removeWidgetDefinition: (id) =>
        set((state) => ({
          availableWidgets: state.availableWidgets.filter((w) => w.id !== id),
          enabledWidgets: state.enabledWidgets.filter((w) => w !== id),
        })),

      setAvailableWidgets: (list) => set({ availableWidgets: list }),

      setEnabledWidgets: (list) => set({ enabledWidgets: list }),
    }),
    {
      name: "widgets-storage",
    }
  )
);
