import { registerAccount } from "../api/account.v1";
import type { AccountCreateInput } from "../types/account.types";
import type {
  AdditionalInformation,
  RegisterAccountRequest,
} from "../types/AccountListResponse.type";
import { encryptAdditionalInformation } from "./Encriptyng.service";
import { useAuthenticatedStore } from "../../auth/store/Authenticated.store";

export const registerAccountService = async (data: AccountCreateInput) => {
  const privateKey = useAuthenticatedStore.getState().privateKey;
  const additionalInformation: AdditionalInformation[] =
    encryptAdditionalInformation(data.additionalInformation, privateKey);
  const payload: RegisterAccountRequest = {
    title: data.title,
    username: data.username,
    description: data.description,
    category: data.category,
    additionalInformation: additionalInformation,
  };

  // Aquí puedes realizar la llamada a la API para registrar la cuenta con el payload encriptado
  const response = await registerAccount(payload);
  return response;
};
