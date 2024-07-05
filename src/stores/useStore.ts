import { defineStore } from "pinia";
// 定义 store 的状态类型
interface MyState {
    activeMenuId: number;
    searchEngine: number;
    newsMenu: object;
    navMenu: object;
    notesList: object;
    activeNotes: any;
    todosList:object;
}
// 创建 store
export const useMyStoreHook = defineStore({
    id: "myStore", // 必须是唯一的字符串 ID
    state: (): MyState => ({
        activeMenuId: 1,
        searchEngine: 1,
        // 新闻
        newsMenu: [
            { label: "微博", value: "weibo" },
            { label: "百度", value: "baidu" },
            { label: "知乎", value: "zhihu" },
            { label: "抖音", value: "douyin" },
            { label: "B站", value: "bilibili" },
            { label: "贴吧", value: "tieba" },
            { label: "掘金", value: "juejin" },
            { label: "36氪", value: "36kr" },
            { label: "IT之家", value: "ithome" },
            { label: "澎湃新闻", value: "thepaper" },
            { label: "头条", value: "toutiao" },
            { label: "少数派", value: "sspai" },
        ],
        // 导航
        navMenu: [
            {
                name: "通义千问",
                iconPath: "https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png",
                linkPath: "https://tongyi.aliyun.com/qianwen/",
            },
            {
                name: "GitHub",
                iconPath: "https://github.com/fluidicon.png",
                linkPath: "https://github.com/",
            },
            {
                name: "耶温笔记",
                iconPath: "https://yuwb.cn/logo.png",
                linkPath: "https://yuwb.cn/",
            },
            {
                name: "Bilibili",
                iconPath: "https://www.bilibili.com/favicon.ico",
                linkPath: "https://www.bilibili.com/",
            },
        ],
        // 笔记
        notesList: [],
        activeNotes: null,
        // todo
        todosList:[],
    }),
    getters: {},
    actions: {
        activeMenuIdChange(data: number): void {
            this.activeMenuId = data;
            localStorage.setItem("activeMenuId", this.activeMenuId + "");
        },
        searchEngineChange(data: number): void {
            this.searchEngine = data;
            localStorage.setItem("searchEngine", this.searchEngine + "");
        },
        newsMenuChange(data: object): void {
            this.newsMenu = data;
            localStorage.setItem("newsMenu", JSON.stringify(data));
        },
        navMenuChange(data: object): void {
            this.navMenu = data;
            localStorage.setItem("navMenu", JSON.stringify(data));
        },
        notesListChange(data: object): void {
            this.notesList = data;
            localStorage.setItem("notesList", JSON.stringify(data));
        },
        activeNotesChange(data: any): void {
            this.activeNotes = data;
            localStorage.setItem("activeNotes", data);
        },
        todosListChange(data: any): void {
            this.todosList = data;
            localStorage.setItem("todosList", JSON.stringify(data));
        },
    },
});
