import type { AxiosError } from "axios";
import type {
  AccountResponse,
  UpdateAccountRequest,
} from "../types/AccountListResponse.type";
import type { ApiErrorResponse } from "../../../shared";
import { updateAccount } from "../api/account.v1";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAccount = () => {

  const mutationUpdate = useMutation<
    AccountResponse,
    AxiosError<ApiErrorResponse>,
    UpdateAccountRequest
  >({
    mutationFn: (data: UpdateAccountRequest) => updateAccount(data),
  });

  const message = mutationUpdate.isSuccess ? "Account updated successfully" : null;
  const error = mutationUpdate.error?.message ?? null;

  return { mutationUpdate , message, error };
};
