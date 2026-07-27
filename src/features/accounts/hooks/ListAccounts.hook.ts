import { useQuery } from "@tanstack/react-query";
import { fetchListAccounts } from "../api/account.v1";
import type { AxiosError } from "axios";
import type { AccountListResponse, ApiErrorResponse } from "../../../Shared";

export const useGetListAccounts = () => {
    return useQuery<AccountListResponse[], AxiosError<ApiErrorResponse>>({
        queryKey: ["accounts-list"],
        queryFn: fetchListAccounts,
        retry: false,
    });
}; 

export default useGetListAccounts;