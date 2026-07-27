import type { UserApiTypes } from "../../../Shared";
import type { TokensTypes } from "../../../Shared";
import api from "../../../lib/api";


const API_BASE_URL = "/auth";

export const fetchRegisterUser = async (userData: UserApiTypes.RegisterUserRequest) => {
    const response = await api.post<TokensTypes.TokenResponse>(`${API_BASE_URL}/register`, userData);
    return response.data;
}

export const fetchLoginUser = async (userData: UserApiTypes.LoginUserRequest) => {
    const response = await api.post<TokensTypes.TokenResponse>(`${API_BASE_URL}/login`, userData);
    return response.data;
}

export const fetchRefreshToken = async () => {
    const response = await api.post<TokensTypes.TokenResponse>(`${API_BASE_URL}/refresh`);
    return response.data;
}

export const fetchSalt = async (email: string) => {
    const response = await api.get<TokensTypes.SaltResponse>(`${API_BASE_URL}/salt/${email}`);
    return response.data;
}