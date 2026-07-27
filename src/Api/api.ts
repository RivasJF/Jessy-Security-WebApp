import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { useAuthenticatedStore } from "../Store/Authenticated.store";
import type { TokensTypes } from "../Shared/Types/Domain/auth/Token.types";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

  const accessToken = useAuthenticatedStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
},
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response: AxiosResponse<ApiResponse<unknown>>) => {
//     return response;
//   },
//     (error: AxiosError<ApiErrorResponse>) => {
//       const errorApi = error as AxiosError<ApiErrorResponse>;
//         return Promise.reject(errorApi);
//     }
// );

const refreshApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
  
api.interceptors.response.use(
  (response:AxiosResponse<unknown>) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (![401, 403].includes(error.response?.status ?? 0) || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshResponse:AxiosResponse<TokensTypes.TokenResponse> = await refreshApi.post("/auth/refresh");
      const newAccessToken = refreshResponse.data.access_token;

      useAuthenticatedStore.getState().setAccessToken(newAccessToken);
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return api(originalRequest);
    } catch (refreshError) {
      useAuthenticatedStore.getState().logout();
      return Promise.reject(refreshError);
    }
  }
);

export default api;

