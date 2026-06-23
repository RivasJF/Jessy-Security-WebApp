import { useState } from "react";
import { bytesToHexString, generateRamdomKey32 } from "../../../Shared/Encoder/cypher";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";
import { fetchRegisterUser } from "../../../Api/Auth/auth.api";
import type { UserApiTypes } from "../../../Shared/Types/Domain/auth/User-api.types";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const salt = generateRamdomKey32();
    const passwordHash = await hashPassword(formData.password, salt);
    const keys = await generateKeyPair(passwordHash);

    // to stored
    // - secretKey: keys.secretKey 

    // to  Backend
    console.log({
      email: formData.email,
      publicKey: keys.publicKey,
      salt: bytesToHexString(salt)
    });
    const registerData: UserApiTypes.RegisterUserRequest = {
      email: formData.email,
      username: formData.username,
      publicKey: keys.publicKey,
      publicSalt: bytesToHexString(salt)
    }
    console.log("Register data to send to backend:", registerData);
    await fetchSaveToBackend(registerData);
  };

  return { formData, handleChange, handleSubmit };
}

async function fetchSaveToBackend(data: UserApiTypes.RegisterUserRequest) {
    try {
      const response = await fetchRegisterUser(data)
      console.log("User registered successfully:", response);
    }
    catch (error: AxiosError<ApiErrorResponse> | any) {
      console.error("Error registering user:", error.response?.data || error.message);
    }
  }