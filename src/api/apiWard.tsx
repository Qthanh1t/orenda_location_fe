// src/api/wardApi.ts
import apiClient from "./apiClient";
import type {Page, Ward, WardRequestParams} from "../types/types.ts"

const wardApi = {
    // GET /api/wards?provinceCode=02
    getAll: (params?: WardRequestParams) =>
        apiClient.get<Page<Ward>>("/api/wards", { params }),

    // GET /api/wards/getByProvinceCode/{provinceCode}
    getByProvinceCode: (provinceCode: string) =>
        apiClient.get<Ward[]>(`/api/wards/getByProvinceCode/${provinceCode}`),

    // GET /api/wards/{id}
    getById: (id: number) => apiClient.get<Ward>(`/api/wards/${id}`),

    // POST /api/wards
    create: (data: Ward) => apiClient.post<Ward>("/api/wards", data),

    // PUT /api/wards/{id}
    update: (id: number, data: Ward) =>
        apiClient.put<Ward>(`/api/wards/${id}`, data),

    // DELETE /api/wards/{id}
    remove: (id: number) => apiClient.delete<void>(`/api/wards/${id}`),
};

export default wardApi;
