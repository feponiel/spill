import { create } from "zustand";
import { api } from "@/lib/axios";

export interface AuthUser {
  id: string
  name: string
  avatar_url: string
  banner_url: string | null
  synthesis: string | null
  created_at: Date
}

interface AuthUserStore {
  user: AuthUser | null
  isLoading: boolean
  fetchUser: () => Promise<void>
  updateUser: (data: Partial<AuthUser>) => void
}

export const useAuthUserStore = create<AuthUserStore>((set) => ({
  user: null,
  isLoading: false,

  fetchUser: async () => {
    set({ isLoading: true });
    const { data } = await api.get("/me")
    set({ user: data, isLoading: false })
  },

  updateUser: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
}))
