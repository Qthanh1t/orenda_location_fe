import {makeAutoObservable, reaction, runInAction} from "mobx";
import provinceApi from "../api/apiProvince.ts";
import type {Province} from "../types/types.ts";


class ProvinceStore {
    list: Province[] = [];
    loading = false;
    total = 0;
    page = 0;
    size = 10;
    selected?: Province;
    text: string = "";
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => [this.text],
            async () => {
                await this.fetchAll(0)
            }
        )
    }

    setText = (text: string) => {
        this.text = text;
    }

    setSize = (size: number) => {
        this.size = size;
    }

    async fetchAll(page: number = this.page, size: number = this.size, text = this.text) {
        this.loading = true;
        try {
            const data= await provinceApi.getAll({ page, size, text });
            runInAction(() => {
                this.list = data.content || [];
                this.page = data.number ?? 0;
                this.size = data.size ?? 10;
                this.total = data.totalElements ?? 0;
            });
        } catch (error) {
            console.error("Lỗi khi gọi API provinces:", error)
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
        await this.fetchAll();
    }

    async update(id: number, data: Province) {
        await provinceApi.update(id, data);
        await this.fetchAll();
    }

    async remove(id: number) {
        await provinceApi.remove(id);
        await this.fetchAll();
    }
}

export const provinceStore = new ProvinceStore();
