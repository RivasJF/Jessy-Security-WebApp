import api from "../api";
import type { ApiResponse } from "../../Shared/Types/Api/ApiResponse.dto";
import type { AccountListResponse } from "../../Shared/Types/Domain/account/AccountListResponse.type";
import type { RegisterAccount } from "../../Shared/Types/Domain/account/RegisterAccount.type";

const API_BASE_URL = "/account";


export const fetchNotices = async (): Promise<AccountListResponse[]> => {
    const response = await api.get<ApiResponse<AccountListResponse[]>>(API_BASE_URL);
    return response.data.data;
}


export const createNotice = async (payload: RegisterAccount): Promise<AccountListResponse> => {
    const response = await api.post<ApiResponse<AccountListResponse>>(`${API_BASE_URL}/register`, payload);
    return response.data.data;
}