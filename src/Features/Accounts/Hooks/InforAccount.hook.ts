import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import { fetchAccountById } from "../../../Api/Account/account.v1";
import type { AccountResponse } from "../../../Shared/Types/Domain/account/AccountResponse.type";
import { useQuery } from "@tanstack/react-query";

export const useGetInfoAccount = (id: string) => {
    return useQuery<AccountResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ["account-info", id],
        queryFn: () => fetchAccountById(id),
        retry: false,
    });
}