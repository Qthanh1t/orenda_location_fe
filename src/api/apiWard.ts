import apiClient from "./apiClient.ts";
import type {Page, Ward, WardRequestParams} from "../types/types.ts"

const wardApi = {
    getAll: (params?: WardRequestParams) =>
        apiClient.get<Page<Ward>>("/api/wards", { params }),

    getByProvinceCode: (provinceCode: string):Promise<Ward[]> =>
        apiClient.get<Ward[]>(`/api/wards/getByProvinceCode/${provinceCode}`),

    getById: (id: number): Promise<Ward> => apiClient.get<Ward>(`/api/wards/${id}`),

    create: (data: Ward): Promise<Ward> => apiClient.post<Ward>("/api/wards", data),

    update: (id: number, data: Ward): Promise<Ward> =>
        apiClient.put<Ward>(`/api/wards/${id}`, data),

    remove: (id: number): Promise<void> => apiClient.delete<void>(`/api/wards/${id}`),
};

export default wardApi;
