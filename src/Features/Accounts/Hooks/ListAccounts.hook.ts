import { useQuery } from "@tanstack/react-query";
import type { AccountListResponse } from "../../../Shared/Types/Domain/account/response/AccountListResponse.type";
import { fetchListAccounts } from "../../../Api/Account/account.v1";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import type { AxiosError } from "axios";

export const useGetListAccounts = () => {
    return useQuery<AccountListResponse[], AxiosError<ApiErrorResponse>>({
        queryKey: ["accounts-list"],
        queryFn: fetchListAccounts,
        retry: false,
    });
}; 

export default useGetListAccounts;