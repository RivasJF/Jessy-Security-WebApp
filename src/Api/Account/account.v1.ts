import api from "../api";
import type { ApiResponse } from "../../Shared/Types/Api/ApiResponse.dto";
import type { AccountListResponse } from "../../Shared/Types/Domain/account/AccountListResponse.type";
import type { RegisterAccount } from "../../Shared/Types/Domain/account/RegisterAccount.type";
import type { AccountResponse } from "../../Shared/Types/Domain/account/AccountResponse.type";

const API_BASE_URL = "/accounts";


export const fetchListAccounts = async (): Promise<AccountListResponse[]> => {
    const response = await api.get<ApiResponse<AccountListResponse[]>>(`${API_BASE_URL}/list`);
    return response.data.data;
}


export const registerAccount = async (payload: RegisterAccount): Promise<AccountResponse> => {
    const response = await api.post<ApiResponse<AccountResponse>>(`${API_BASE_URL}/register`, payload);
    return response.data.data;
}

export const fetchAccountById = async (id: string): Promise<AccountResponse> => {
    const response = await api.get<ApiResponse<AccountResponse>>(`${API_BASE_URL}/${id}`);
    return response.data.data;
}