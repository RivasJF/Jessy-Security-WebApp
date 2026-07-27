import api from "../../../lib/api";
import type { GetSaltResponse, LoginUserRequest, RegisterUserRequest, TokenResponse } from "../types/api.types";

const API_BASE_URL = "/auth";

export const fetchRegisterUser = async (userData: RegisterUserRequest) => {
    const response = await api.post<TokenResponse>(`${API_BASE_URL}/register`, userData);
    return response.data;
}

export const fetchLoginUser = async (userData: LoginUserRequest) => {
    const response = await api.post<TokenResponse>(`${API_BASE_URL}/login`, userData);
    return response.data;
}

export const fetchRefreshToken = async () => {
    const response = await api.post<TokenResponse>(`${API_BASE_URL}/refresh`);
    return response.data;
}

export const fetchSalt = async (email: string) => {
    const response = await api.get<GetSaltResponse>(`${API_BASE_URL}/salt/${email}`);
    return response.data;
}