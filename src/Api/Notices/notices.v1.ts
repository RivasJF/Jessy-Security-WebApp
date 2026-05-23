import api from "../api";

const API_BASE_URL = "/notice";

export interface Notice {
    id: number;
    message: string;
    createdAt: string;
}

export const fetchNotices = async (): Promise<Notice[]> => {
    const response = await api.get<Notice[]>(API_BASE_URL);
    return response.data;
}

export const fetchANotice = async (idNotice: number): Promise<Notice> => {
    const response = await api.get<Notice>(`${API_BASE_URL}/${idNotice}`);
    return response.data;
}