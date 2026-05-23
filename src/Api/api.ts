import axios, { AxiosError } from "axios";
import type { ApiErrorResponse } from "./Dto/ApiErrorResponse.dto";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
    (error: AxiosError<ApiErrorResponse>) => {
      //console.error("API Error:", error.response?.data);
        return Promise.reject(error);
    }
);

export default api;