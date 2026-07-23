import { useState } from "react";
import { fetchRegisterUser } from "../../../Api/Auth/auth.api";
import type { UserApiTypes } from "../../../Shared/Types/Domain/auth/User-api.types";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import { useAuthenticatedStore } from "../../../Store/Authenticated.store";
import { generateAccessKeyRegister, type AccessKeyRegister } from "../service/hashing.service";

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