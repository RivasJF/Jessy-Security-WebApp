import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiErrorResponse } from "../Shared/Types/Api/ApiErrorResponse.dto";
import type { ApiResponse } from "../Shared/Types/Api/ApiResponse.dto";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    return response;
  },
    (error: AxiosError<ApiErrorResponse>) => {
        return Promise.reject(error);
    }
);

export default api;