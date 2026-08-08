import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../shared";
import type { AccountResponse } from "../types/AccountListResponse.type";
import { useMutation } from "@tanstack/react-query";
import type { UpdateAccountRequest } from "../types/account.types";
import { updateAccountService } from "../services/updateAccountService";


export const useAccountUpdate = () => {
  const accountMutation = useMutation<
    AccountResponse,
    AxiosError<ApiErrorResponse>,
    UpdateAccountRequest
  >({
    mutationFn: updateAccountService,
    onSuccess: () => {
      alert("Account update successfully");
    },
  })


  return {
    updateAccountFn: accountMutation.mutate,
    isLoading: accountMutation.isPending,
    isError: accountMutation.isError,
    error: accountMutation.error,
  }
};
