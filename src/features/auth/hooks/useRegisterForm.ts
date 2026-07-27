import { useState } from "react";
import { fetchRegisterUser } from "../api/auth.api";
import type { AxiosError } from "axios";
import { useAuthenticatedStore } from "../store/Authenticated.store";
import { generateAccessKeyRegister, type AccessKeyRegister } from "../service/hashing.service";
import type { ApiErrorResponse, UserApiTypes } from "../../../shared";

export function useRegisterForm() {
  const { login } = useAuthenticatedStore();

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
    const AccessKey: AccessKeyRegister = await generateAccessKeyRegister(formData.password);

    const registerData: UserApiTypes.RegisterUserRequest = {
      email: formData.email,
      username: formData.username,
      publicKey: AccessKey.keys.publicKey,
      publicSalt: AccessKey.salt,
    }

    const response = await fetchSaveToBackend(registerData);
    login(AccessKey.keys.secretKey, response.access_token);
  };

  return { formData, handleChange, handleSubmit };
}

async function fetchSaveToBackend(data: UserApiTypes.RegisterUserRequest) {
    try {
      const response = await fetchRegisterUser(data)
      console.log("User registered successfully:", response);
      return response;
    }
    catch (error: AxiosError<ApiErrorResponse> | any) {
      console.error("Error registering user:", error.response?.data || error.message);
      throw error;
    }
  }