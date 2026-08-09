import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiErrorResponse } from "../../../shared";
import { fetchDeleteById } from "../api/account.v1";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, AxiosError<ApiErrorResponse>, string>({
    mutationFn: fetchDeleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts-list"] });
    }
  });

  return {
    deleteAccountFn: deleteMutation.mutate,
    isLoading: deleteMutation.isPending,
    isError: deleteMutation.isError,
    error: deleteMutation.error,
  };
};
