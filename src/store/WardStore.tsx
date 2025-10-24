import {makeAutoObservable, reaction, runInAction} from "mobx";
import wardApi from "../api/apiWard.ts";
import type {Page, Ward} from "../types/types.ts";

class WardStore {
    list: Ward[] = [];
    loading = false;
    total = 0;
    page = 0;
    size = 10;
    selected?: Ward;
    provinceCode: string = "";
    text: string = "";

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => [this.text, this.provinceCode],
            async () => {
                await this.fetchAll(0)
            }
        )
    }

    setText(text: string) {
        this.text = text;
    }

    setProvinceCode(code: string) {
        this.provinceCode = code;
    }

    async fetchAll(page: number = this.page, size: number = this.size, provinceCode: string = this.provinceCode, text: string = this.text) {
        this.loading = true;
        try {
            const data: Page<Ward> = await wardApi.getAll({ page, size, provinceCode, text });
            runInAction(() => {
                this.list = data.content;
                this.page = data.number;
                this.size = data.size;
                this.total = data.totalElements;
            });
        } catch (error) {
            console.error("Lỗi khi gọi API:", error)
        }  finally {
            runInAction(() => (this.loading = false));
        }
    }

    async getByProvinceCode(provinceCode: string){
        const res = await wardApi.getByProvinceCode(provinceCode);
        runInAction(() => {
            this.list = res;
        })
    }

    async getById(id: number) {
        const res = await wardApi.getById(id);
        runInAction(() => (this.selected = res));
    }

    async create(data: Ward) {
        await wardApi.create(data);
        await this.fetchAll();
    }

    async update(id: number, data: Ward) {
        await wardApi.update(id, data);
        await this.fetchAll();
    }

    async remove(id: number) {
        await wardApi.remove(id);
        await this.fetchAll();
    }
}

export const wardStore = new WardStore();
