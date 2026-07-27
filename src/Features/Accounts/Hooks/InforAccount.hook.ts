import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import { fetchAccountById } from "../../../Api/Account/account.v1";
import { useQuery } from "@tanstack/react-query";
import type { AccountResponse } from "../../../Shared/Types/Domain/account/response/AccountResponse.type";

export const useGetInfoAccount = (id: string) => {
    return useQuery<AccountResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ["account-info", id],
        queryFn: () => fetchAccountById(id),
        retry: false,
    });
}