import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const apiClient = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const res = await instance.get<unknown, T>(url, config);
        return res;
    },

    post: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const res = await instance.post<unknown, T>(url, body, config);
        return res;
    },

    put: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const res = await instance.put<unknown, T>(url, body, config);
        return res;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const res = await instance.delete<unknown, T>(url, config);
        return res;
    },
};
export default apiClient;