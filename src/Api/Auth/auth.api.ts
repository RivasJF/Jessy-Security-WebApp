import type { ApiResponse } from "../../Shared/Types/Api/ApiResponse.dto";
import type { TokenResponse } from "../../Shared/Types/Domain/Token-api.types";
import type { UserApiTypes } from "../../Shared/Types/Domain/auth/User-api.types";
import api from "../api";

const API_BASE_URL = "/auth";

export const fetchRegisterUser = async (userData: UserApiTypes.RegisterUserRequest) => {
    const response = await api.post<ApiResponse<TokenResponse>>(`${API_BASE_URL}/register`, userData);
    return response.data.data;
}

export const fetchLoginUser = async (userData: UserApiTypes.LoginUserRequest) => {
    const response = await api.post<ApiResponse<TokenResponse>>(`${API_BASE_URL}/login`, userData);
    return response.data.data;
}

export const fetchRefreshToken = async () => {
    const response = await api.post<ApiResponse<TokenResponse>>(`${API_BASE_URL}/refresh`);
    return response.data.data;
}

export const fetchSalt = async (email: string) => {
    const response = await api.get<ApiResponse<UserApiTypes.SaltResponse>>(`${API_BASE_URL}/salt/${email}`);
    return response.data.data;
}