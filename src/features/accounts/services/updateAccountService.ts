import { useAuthenticatedStore } from "../../auth";
import { updateAccount } from "../api/account.v1";
import type {
  AccountEditInput,
  UpdateAccountRequest,
  UpdateAdditionalInformationRequest,
} from "../types/account.types";
import type { AccountResponse } from "../types/AccountListResponse.type";
import type { CategoryAccount } from "../types/CategoryAccount.type";
import {
  encryptAdditionalInformationInput,
  encryptAdditionalInformationInputNew,
} from "./Encriptyng.service";

export function updateAccountService(
  accountUpdate: AccountEditInput,
  currentAccount: AccountResponse,
): Promise<AccountResponse> {
  const privateKey = useAuthenticatedStore.getState().privateKey;
  const payload: UpdateAccountRequest = {
    id: currentAccount.id,
    title:
      currentAccount.title === accountUpdate.title ? null : accountUpdate.title,
    username:
      accountUpdate.username === currentAccount.username
        ? null
        : accountUpdate.username,
    description:
      accountUpdate.description === currentAccount.description
        ? null
        : accountUpdate.description,
    category:
      accountUpdate.category === (currentAccount.category as CategoryAccount)
        ? null
        : accountUpdate.category,
    additionalInformation: accountUpdate.additionalInformation.map((add) => {
      if (add.deleted == true) {
        return {
          id: add.id,
          deleted: true,
          type: null,
          value: null,
          key: null,
        } as UpdateAdditionalInformationRequest;
      }

      if (add.id == undefined) {
        const newAdd = encryptAdditionalInformationInputNew(add, privateKey);
        return {
          id: null,
          delete: null,
          type: add.type,
          value: newAdd.value,
          key: newAdd.key,
        };
      }

      const original = currentAccount.additionalInformation.find(
        (x) => x.id === add.id,
      );
      const valueChanged = original ? original.value !== add.value : true;

      if (valueChanged) {
        const encrypted = encryptAdditionalInformationInput(add, privateKey);
        return {
          id: add.id,
          delete: null,
          type: null,
          value: encrypted.value,
          key: null,
        };
      }
      const typeChanged = original ? original.type !== add.type : true;
      if (typeChanged) {
        return {
          id: null,
          delete: null,
          type: add.type,
          value: null,
          key: null,
        };
      }
      return null;

    })
    .filter((item) => item !== null),
  };
  console.log("Payload to update account:", payload);
  const response = updateAccount(payload);
  return response;
}
