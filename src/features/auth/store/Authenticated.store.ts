import { create } from "zustand";

type AuthenticatedStore = {
  isAuthenticated: boolean;
  privateKey: string;
  accessToken: string;
  setAccessToken: (value: string) => void;
  login: (privateKey: string, accessToken: string) => void;
  logout: () => void;
};

export const useAuthenticatedStore = create<AuthenticatedStore>((set) => ({
  isAuthenticated: false,
  privateKey: "",
  accessToken: "",
  setAccessToken: (value) => set({ accessToken: value }),
  login: (privateKey, accessToken) => set({ isAuthenticated: true, privateKey, accessToken }),
  logout: () => set({ isAuthenticated: false, privateKey: "", accessToken: "" }),
}));
