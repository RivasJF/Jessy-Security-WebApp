import { useState } from "react";
import { useAuthenticatedStore } from "../store/Authenticated.store";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { fetchLoginUser, fetchSalt } from "../api/auth.api";
import { generateKeyPair, hashPassword, stringHexToBytes, type ApiErrorResponse, type KeyPair } from "../../../shared";
import type { GetSaltResponse, TokenResponse } from "../types/api.types";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginMutationResult = {
  token: TokenResponse;
  keys: KeyPair;
};

export function useLoginForm() {
  const { login } = useAuthenticatedStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginMutation = useMutation<
    LoginMutationResult,
    AxiosError<ApiErrorResponse>,
    LoginFormData
  >({
    mutationFn: async (data: LoginFormData) => {
      // fetch salt_F
      const keysSalt: GetSaltResponse = await fetchSalt(data.email);
      const salt = stringHexToBytes(keysSalt.salt);
      // create valid keys
      const passwordHash = await hashPassword(data.password, salt);
      const keys: KeyPair = await generateKeyPair(passwordHash);
      // fetch login {email, publicKey}
      const accessToken: TokenResponse = await fetchLoginUser({
        email: data.email,
        publicKey: keys.publicKey,
      });
      return { token: accessToken, keys };
    },

    onSuccess: ({ token, keys }) => {
      // to stored
      login(keys.secretKey, token.access_token);
    },
  });

  const errorMessage = loginMutation.error
      ? loginMutation.error.response?.status === 401
        ? "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña."
        : "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error: errorMessage,
    isLoading: loginMutation.isPending,
  };
}
