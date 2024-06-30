import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    count: 0,
    isEditNav: false, // 修改导航连接
    username:'',  // 用户名字
    is_nav:null,  // 是否显示导航
    nav_type:null, // 导航位置
    isShowAddNav:false, // 添加导航弹窗
    nav_list:[],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});