import { useAuthenticatedStore } from "../store/Authenticated.store";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import {type ApiErrorResponse } from "../../../shared";
import type { LoginFormData, LoginMutationResult } from "../types/api.types";
import { loginUserService } from "../service/loginUserService";


export function useLoginForm() {
  const { login } = useAuthenticatedStore();

  const loginMutation = useMutation<
    LoginMutationResult,
    AxiosError<ApiErrorResponse>,
    LoginFormData
    >({
      mutationFn: loginUserService,
      onSuccess: ({ token, keys }) => {
        login(keys.secretKey, token.access_token);
      },
    });

  const errorMessage = loginMutation.error
      ? loginMutation.error.response?.status === 401
        ? "Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña."
        : "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
      : null;

  return {
    loginFn: loginMutation.mutate,
    error: errorMessage,
    isLoading: loginMutation.isPending,
  };
}
