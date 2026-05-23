import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiErrorResponse } from "./Dto/ApiErrorResponse.dto";
import type { ApiResponse } from "./Dto/ApiResponse.dto";

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
      //console.error("API Error:", error.response?.data);
        return Promise.reject(error);
    }
);

export default api;