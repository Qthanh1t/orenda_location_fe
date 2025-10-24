// src/stores/ProvinceStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import provinceApi from "../api/apiProvince.tsx";
import type {Page, Province} from "../types/types.ts";

class ProvinceStore {
    list: Province[] = [];
    loading = false;
    total = 0;
    page = 0;
    size = 10;
    selected?: Province;
    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll(page: number = this.page, size: number = this.size) {
        this.loading = true;
        try {
            const data: Page<Province> = await provinceApi.getAll({ page, size });
            if (!data) throw new Error("Response is empty");
            runInAction(() => {
                this.list = data.content || [];
                this.page = data.number ?? 0;
                this.size = data.size ?? 10;
                this.total = data.totalElements ?? 0;
            });
        } finally {
            runInAction(() => (this.loading = false));
        }
    }

    async getById(id: number) {
        const res = await provinceApi.getById(id);
        runInAction(() => (this.selected = res));
    }

    async create(data: Province) {
        await provinceApi.create(data);
        this.fetchAll();
    }

    async update(id: number, data: Province) {
        await provinceApi.update(id, data);
        this.fetchAll();
    }

    async remove(id: number) {
        await provinceApi.remove(id);
        this.fetchAll();
    }
}

export const provinceStore = new ProvinceStore();
