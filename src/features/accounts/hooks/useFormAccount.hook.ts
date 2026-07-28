import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { registerAccount } from "../api/account.v1";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../shared";
import { useAuthenticatedStore } from "../../auth/store/Authenticated.store";
import { encryptAdditionalInformation } from "../services/Encriptyng.service";
import type { CategoryAccount } from "../types/CategoryAccount.type";
import type { AdditionalInformation, RegisterAccountRequest } from "../types/AccountListResponse.type";


type Inputs = {
  title: string;
  username: string;
  description: string;
  category: CategoryAccount;
  additionalInformation: AdditionalInformationInput[];
};

export type AdditionalInformationInput = {
  type: string;
  value: string;
};

export const useFormAccount = () => {
    const {privateKey} = useAuthenticatedStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInformation",
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    //encritar datos

    const additionalInformation: AdditionalInformation[] = encryptAdditionalInformation(data.additionalInformation, privateKey);
    const payload: RegisterAccountRequest = {
      title: data.title,
      username: data.username,
      description: data.description,
      category: data.category,
      additionalInformation: additionalInformation,
    };
  
    // Aquí puedes realizar la llamada a la API para registrar la cuenta con el payload encriptado
    const response = await save(payload);
    console.log("Response from API:", response);
  }

  return {
    register,
    fields,
    append,
    remove,
    handleSubmit,
    onSubmit,
    errors,
  }
};


async function save(payload:RegisterAccountRequest) {
  try {
        const response = await registerAccount(payload);
        console.log("Account registered successfully:", response);
        return response;
      }
      catch (error: AxiosError<ApiErrorResponse> | any) {
        console.error("Error registering account:", error.response?.data || error.message);
        throw error;
      }
}