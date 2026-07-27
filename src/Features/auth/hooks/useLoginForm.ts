import { useState } from "react";
import { useAuthenticatedStore } from "../store/Authenticated.store";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import type { LoginTypes } from "../types/Login.types";
import { fetchLoginUser, fetchSalt } from "../api/auth.api";
import { generateKeyPair, hashPassword, stringHexToBytes, type ApiErrorResponse, type TokensTypes } from "../../../Shared";

export function useLoginForm() {
  const { login } = useAuthenticatedStore();
  const [formData, setFormData] = useState<LoginTypes.LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginMutation = useMutation<
    LoginTypes.LoginMutationResult,
    AxiosError<ApiErrorResponse>,
    LoginTypes.LoginFormData
  >({
    mutationFn: async (data: LoginTypes.LoginFormData) => {
      // fetch salt_F
      const keysSalt: TokensTypes.SaltResponse = await fetchSalt(data.email);
      const salt = stringHexToBytes(keysSalt.salt);
      // create valid keys
      const passwordHash = await hashPassword(data.password, salt);
      const keys: TokensTypes.KeyPair = await generateKeyPair(passwordHash);
      // fetch login {email, publicKey}
      const accessToken: TokensTypes.TokenResponse = await fetchLoginUser({
        email: data.email,
        publicKey: keys.publicKey,
      });
      return { token: accessToken, keys };
    },

    onSuccess: ({ token, keys }) => {
      // to stored
      login(keys.secretKey, token.access_token);
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorApi = error as AxiosError<ApiErrorResponse>;
      const status = errorApi.response?.status;
      if (status == 401) {
        setError(
          "Credenciales invalidas. Por favor, verifica tu correo electrónico y contraseña.",
        );
      } else {
        setError(
          "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
        );
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    isLoading: loginMutation.isPending,
  };
}
