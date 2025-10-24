import { makeAutoObservable, runInAction } from "mobx";
import wardApi from "../api/apiWard.tsx";
import type {Page, Ward} from "../types/types.ts";

class WardStore {
    list: Ward[] = [];
    loading = false;
    total = 0;
    page = 0;
    size = 10;
    selected?: Ward;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll(page: number = this.page, size: number = this.size, provinceCode?: string) {
        this.loading = true;
        try {
            const data: Page<Ward> = await wardApi.getAll({ page, size, provinceCode });
            runInAction(() => {
                this.list = data.content;
                this.page = data.number;
                this.size = data.size;
                this.total = data.totalElements;
            });
        } finally {
            runInAction(() => (this.loading = false));
        }
    }

    async getById(id: number) {
        const res = await wardApi.getById(id);
        runInAction(() => (this.selected = res));
    }

    async create(data: Ward) {
        await wardApi.create(data);
        this.fetchAll();
    }

    async update(id: number, data: Ward) {
        await wardApi.update(id, data);
        this.fetchAll();
    }

    async remove(id: number) {
        await wardApi.remove(id);
        this.fetchAll();
    }
}

export const wardStore = new WardStore();
