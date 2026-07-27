import type { AxiosError } from "axios";
import { fetchAccountById } from "../api/account.v1";
import { useQuery } from "@tanstack/react-query";
import type { AccountResponse, ApiErrorResponse } from "../../../shared";

export const useGetInfoAccount = (id: string) => {
    return useQuery<AccountResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ["account-info", id],
        queryFn: () => fetchAccountById(id),
        retry: false,
    });
}