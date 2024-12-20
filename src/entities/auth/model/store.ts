import { AuthDto } from './dtos'
import { create } from 'zustand'

interface AuthStore {
  auth: AuthDto | null
  setAuth: (auth: AuthDto | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
  clearAuth: () => set({ auth: null })
}))