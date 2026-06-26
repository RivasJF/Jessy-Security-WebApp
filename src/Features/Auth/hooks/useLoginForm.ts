import { useState } from "react";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";
import type { UserApiTypes } from "../../../Shared/Types/Domain/auth/User-api.types";
import { fetchLoginUser, fetchSalt } from "../../../Api/Auth/auth.api";
import { stringHexToBytes } from "../../../Shared/Encoder/cypher";
import type { TokenResponse } from "../../../Shared/Types/Domain/Token-api.types";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import type { AxiosError } from "axios";

export function useLoginForm() {
  const { setAccessToken, setPrivateKey, setIsAuthenticated } =
    useAuthenticatedStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // fetch salt_F
      const keysSalt: UserApiTypes.SaltResponse = await fetchSalt(formData.email);
      const salt = stringHexToBytes(keysSalt.salt);
      // create valid keys
      const passwordHash = await hashPassword(formData.password, salt);
      const keys = await generateKeyPair(passwordHash);
      // to stored
      // - secretKey: keys.secretKey
      setPrivateKey(keys.secretKey);
      // fetch login {email, publicKey}
      const tokens: TokenResponse = await fetchLoginUser({
        email: formData.email,
        publicKey: keys.publicKey,
      });
      setAccessToken(tokens.accessToken);
      setIsAuthenticated(true);

    } catch (error: AxiosError<ApiErrorResponse> | unknown) {
      const errorApi = error as AxiosError<ApiErrorResponse>;
      const status = errorApi.response?.status;
      if ( status == 401 ) {
        setError("Credenciales invalidas. Por favor, verifica tu correo electrónico y contraseña.");
      } else{
        setError("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
      }
      throw errorApi;
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, isLoading };
}