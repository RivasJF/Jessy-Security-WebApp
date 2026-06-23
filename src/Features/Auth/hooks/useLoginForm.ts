import { useState } from "react";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";
import type { UserApiTypes } from "../../../Shared/Types/Domain/auth/User-api.types";
import { fetchLoginUser, fetchSalt } from "../../../Api/Auth/auth.api";
import { stringHexToBytes } from "../../../Shared/Encoder/cypher";
import type { TokenApi } from "../../../Shared/Types/Domain/Token-api.types";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // fetch salt_F
    const keysSalt: UserApiTypes.SaltResponse = await fetchSaltApi(formData.email);
    const salt = stringHexToBytes(keysSalt.salt);

    // create valid keys
    const passwordHash = await hashPassword(formData.password, salt);
    const keys = await generateKeyPair(passwordHash);

    // fetch login {email, publicKey}
    const tokens: TokenApi.TokenResponse = await fetchLoginApi({
      email: formData.email,
      publicKey: keys.publicKey,
    });

    console.log(formData);
    console.log(tokens);
  };

  return { formData, handleChange, handleSubmit };
}

async function fetchSaltApi(email:string):Promise<UserApiTypes.SaltResponse> {
  try {
    const response = await fetchSalt(email);
    return response;
  } catch (error) {
    console.error("Error fetching salt:", error);
    throw error;
  }
};

async function fetchLoginApi(data: UserApiTypes.LoginUserRequest): Promise<TokenApi.TokenResponse> {
  try {
    const response = await fetchLoginUser(data);
    return response;
  } catch (error) {
    console.error("Error fetching login:", error);
    throw error;
  }
}