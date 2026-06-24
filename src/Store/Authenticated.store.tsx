import { create } from "zustand";

type AuthenticatedStore = {
  isAuthenticated: boolean;
  privateKey: string;
  accessToken: string;
  setIsAuthenticated: (value: boolean) => void;
  setPrivateKey: (value: string) => void;
  setAccessToken: (value: string) => void;
};

export const useAuthenticatedStore = create<AuthenticatedStore>((set) => ({
  isAuthenticated: false,
  privateKey: "",
  accessToken: "",

  setPrivateKey: (value) => set({ privateKey: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setAccessToken: (value) => set({ accessToken: value }),
}));
