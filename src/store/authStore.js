import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")),

  login: (username, password) => {
    if (username === "admin" && password === "1234") {
      const user = { name: "Admin" };
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
