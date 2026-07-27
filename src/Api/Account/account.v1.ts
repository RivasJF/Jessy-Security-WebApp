import api from "../api";
import type { AccountListResponse } from "../../Shared/Types/Domain/account/response/AccountListResponse.type";
import type { RegisterAccount } from "../../Shared/Types/Domain/account/request/RegisterAccount.type";
import type { AccountResponse } from "../../Shared/Types/Domain/account/response/AccountResponse.type";

const API_BASE_URL = "/accounts";


export const fetchListAccounts = async (): Promise<AccountListResponse[]> => {
    const response = await api.get<AccountListResponse[]>(`${API_BASE_URL}/list`);
    return response.data;
}


export const registerAccount = async (payload: RegisterAccount): Promise<AccountResponse> => {
    const response = await api.post<AccountResponse>(`${API_BASE_URL}/register`, payload);
    return response.data;
}

export const fetchAccountById = async (id: string): Promise<AccountResponse> => {
    const response = await api.get<AccountResponse>(`${API_BASE_URL}/${id}`);
    return response.data;
}