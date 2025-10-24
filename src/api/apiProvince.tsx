// src/api/provinceApi.ts
import apiClient from "./apiClient";
import type {Page, Province, ProvinceRequestParams} from "../types/types.ts"

const provinceApi = {
    // GET /api/provinces
    getAll: (params?: ProvinceRequestParams) =>
        apiClient.get<Page<Province>>("/api/provinces", { params }),

    // GET /api/provinces/{id}
    getById: (id: number) => apiClient.get<Province>(`/api/provinces/${id}`),

    // POST /api/provinces
    create: (data: Province) => apiClient.post<Province>("/api/provinces", data),

    // PUT /api/provinces/{id}
    update: (id: number, data: Province) =>
        apiClient.put<Province>(`/api/provinces/${id}`, data),

    // DELETE /api/provinces/{id}
    remove: (id: number) => apiClient.delete<void>(`/api/provinces/${id}`),
};

export default provinceApi;
