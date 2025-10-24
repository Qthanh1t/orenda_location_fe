import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default apiClient;
