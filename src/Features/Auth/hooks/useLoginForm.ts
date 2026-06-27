import { useState } from "react";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";
import type { UserApiTypes } from "../../../Shared/Types/Domain/auth/User-api.types";
import { fetchLoginUser, fetchSalt } from "../../../Api/Auth/auth.api";
import { stringHexToBytes } from "../../../Shared/Encoder/cypher";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import type { LoginTypes } from "../types/Login.types";
import type { TokensTypes } from "../../../Shared/Types/Domain/auth/Token.types";


export function useLoginForm() {
  const { setAccessToken, setPrivateKey, setIsAuthenticated } =
    useAuthenticatedStore();
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
      setPrivateKey(keys.secretKey);
      setAccessToken(token.accessToken);
      setIsAuthenticated(true);
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
