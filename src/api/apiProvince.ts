import apiClient from "./apiClient.ts";
import type {Page, Province, ProvinceRequestParams} from "../types/types.ts"

const provinceApi = {
    getAll: (params?: ProvinceRequestParams): Promise<Page<Province>> =>
        apiClient.get<Page<Province>>("/api/provinces", { params }),

    getById: (id: number): Promise<Province> =>
        apiClient.get<Province>(`/api/provinces/${id}`),

    create: (data: Province): Promise<Province> =>
        apiClient.post<Province>("/api/provinces", data),

    update: (id: number, data: Province): Promise<Province> =>
        apiClient.put<Province>(`/api/provinces/${id}`, data),

    remove: (id: number): Promise<void> =>
        apiClient.delete<void>(`/api/provinces/${id}`),
};

export default provinceApi;
