import { defineStore } from "pinia";

// 定义 store 的状态类型
interface MyState {
    activeMenuId: number;
    searchEngine: number;
}

// 创建 store
export const useMyStoreHook = defineStore({
    id: "myStore", // 必须是唯一的字符串 ID
    state: (): MyState => ({
        activeMenuId: 1,
        searchEngine: 1,
    }),
    getters: {},
    actions: {
        activeMenuIdChange(data: number): void {
            this.activeMenuId = data;
            localStorage.setItem("activeMenuId", this.activeMenuId + "");
        },
        searchEngineChange(data:number):void{
            this.searchEngine = data;
            localStorage.setItem("searchEngine", this.searchEngine + "");
        }
    },
});
