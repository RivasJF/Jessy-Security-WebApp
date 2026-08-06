import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../shared";
import type { AccountResponse } from "../types/AccountListResponse.type";
import type { AccountCreateInput } from "../types/account.types";
import { useMutation } from "@tanstack/react-query";
import { registerAccountService } from "../services/registerAccountService";


export const useAccountForm = () => {
  const accountMutation = useMutation<
    AccountResponse,
    AxiosError<ApiErrorResponse>,
    AccountCreateInput
  >({
    mutationFn: registerAccountService,
    onSuccess: () => {
      alert("Account registered successfully");
    },
  })


  return {
    registerAccountFn: accountMutation.mutate,
    isLoading: accountMutation.isPending,
    isError: accountMutation.isError,
    error: accountMutation.error,
  }
};
