import type { AxiosError } from "axios";
import { fetchAccountById } from "../../Api/Account/account.v1";
import { useQuery } from "@tanstack/react-query";
import type { AccountResponse, ApiErrorResponse } from "../../../Shared";

export const useGetInfoAccount = (id: string) => {
    return useQuery<AccountResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ["account-info", id],
        queryFn: () => fetchAccountById(id),
        retry: false,
    });
}