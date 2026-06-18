import api from "../api";
import type { ApiResponse } from "../../Shared/Types/Api/ApiResponse.dto";

const API_BASE_URL = "/notice";

export interface Notice {
    id: number;
    message: string;
    createdAt: string;
}

export interface NoticeCreate {
    message: string;
}

export interface NoticeUpdate {
    message: string;
}


export const fetchNotices = async (): Promise<Notice[]> => {
    const response = await api.get<ApiResponse<Notice[]>>(API_BASE_URL);
    return response.data.data;
}

export const fetchANotice = async (idNotice: number): Promise<ApiResponse<Notice>> => {
    const response = await api.get<ApiResponse<Notice>>(`${API_BASE_URL}/${idNotice}`);
    return response.data;
}

export const createNotice = async (payload: NoticeCreate): Promise<Notice> => {
    const response = await api.post<ApiResponse<Notice>>(`${API_BASE_URL}/register`, payload);
    return response.data.data;
}

export const deleteNotice = async (id: number): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`${API_BASE_URL}/${id}/delete`);
    return response.data.data;
}

export const updateNotice = async (payload: NoticeUpdate): Promise<Notice> => {
    const response = await api.patch<ApiResponse<Notice>>(`${API_BASE_URL}/update`, payload);
    return response.data.data;
}