import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AppState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  notifications: { id: string; message: string; read: boolean }[];
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  addNotification: (message: string) => void;
  markRead: (id: string) => void;
}

export const useAppStore = create<AppState>()(immer((set) => ({
  sidebarOpen: true,
  theme: "system",
  notifications: [],
  toggleSidebar: () => set((s) => { s.sidebarOpen = !s.sidebarOpen; }),
  setTheme: (theme) => set((s) => { s.theme = theme; }),
  addNotification: (message) => set((s) => {
    s.notifications.push({ id: crypto.randomUUID(), message, read: false });
  }),
  markRead: (id) => set((s) => {
    const n = s.notifications.find((n) => n.id === id);
    if (n) n.read = true;
  }),
})));
