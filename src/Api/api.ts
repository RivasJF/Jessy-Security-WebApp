import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiErrorResponse } from "../Shared/Types/Api/ApiErrorResponse.dto";
import type { ApiResponse } from "../Shared/Types/Api/ApiResponse.dto";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    return response;
  },
    (error: AxiosError<ApiErrorResponse>) => {
      const errorApi = error as AxiosError<ApiErrorResponse>;
        return Promise.reject(errorApi);
    }
);

export default api;