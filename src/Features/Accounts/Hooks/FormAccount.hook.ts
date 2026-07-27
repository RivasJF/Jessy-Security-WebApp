import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { useAuthenticatedStore } from "../../Auth/Store/Authenticated.store";
import { registerAccount } from "../../Api/Account/account.v1";
import type { AxiosError } from "axios";
import { encryptAdditionalInformation } from "../Services/Encriptyng.service";
import type { Inputs } from "../types/InputFormAccounr";
import type { AdditionalInformation, ApiErrorResponse, RegisterAccount } from "../../../Shared";



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
    const payload: RegisterAccount = {
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


async function save(payload:RegisterAccount) {
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