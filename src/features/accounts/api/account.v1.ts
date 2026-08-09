import api from "../../../lib/api";
import type { UpdateAccountRequest } from "../types/account.types";
import type { AccountListResponse, AccountResponse, RegisterAccountRequest } from "../types/AccountListResponse.type";

const API_BASE_URL = "/accounts";

export const fetchListAccounts = async (): Promise<AccountListResponse[]> => {
    const response = await api.get<AccountListResponse[]>(`${API_BASE_URL}/list`);
    return response.data;
}

export const registerAccount = async (payload: RegisterAccountRequest): Promise<AccountResponse> => {
    const response = await api.post<AccountResponse>(`${API_BASE_URL}/register`, payload);
    return response.data;
}

export const fetchAccountById = async (id: string): Promise<AccountResponse> => {
    const response = await api.get<AccountResponse>(`${API_BASE_URL}/${id}`);
    return response.data;
}

export const updateAccount = async (payload: UpdateAccountRequest): Promise<AccountResponse> => {
    const response = await api.patch<AccountResponse>(`${API_BASE_URL}/update`, payload);
    return response.data;
}

export const fetchDeleteById = async (id: string): Promise<void> => {
    const response = await api.delete<void>(`${API_BASE_URL}/delete/${id}`);
    return response.data;
}
