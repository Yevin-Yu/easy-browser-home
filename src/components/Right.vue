<template>
  <div class="right">
    <div class="link-list">
      <h3>导航列表</h3>
      <el-button @click.stop="mainStore.isEditNav = false" v-if="mainStore.isEditNav" class="close close2" circle>
        <img height="18px" src="@/assets/right.svg" alt="close">
      </el-button>
      <button class="button" v-for="item in mainStore.nav_list" :key="item.nav_id" @click="go(item)">
        <el-button @click.stop="delNavItem(item)" v-if="mainStore.isEditNav" class="close" circle>
          <img height="12px" src="@/assets/close.svg" alt="close">
        </el-button>
        <span class="img">
          <img height="26px" :src="item.icon_path" alt="icon">
        </span>
        <span class="text">
            {{ item.name }}
        </span>
      </button>
      <button v-if="mainStore.isEditNav" class="button add-nav" @click="isAddNav()">
        <span class="img">
          <img height="26px" src="@/assets/add.svg" alt="icon">
        </span>
        <span class="text">
            添加导航
         </span>
      </button>
    </div>
  </div>
  <AddNav v-if="mainStore.isShowAddNav"></AddNav>
</template>
<script setup>
import AddNav from "@/components/addNav.vue";
import { ref } from "vue";
import { useMainStore } from "@/stores/useMainStore";
import axiosInstance from "@/axios/index.js";
import { ElMessage } from "element-plus";

const mainStore = useMainStore();

function go(item) {
  window.open(item.link_path);
}

function delNavItem(item) {
  axiosInstance.post("/nav/del", { nav_id:item.nav_id }).then(res => {
    if (res.status === 200) {
      ElMessage({
        message: "Delete success",
        type: "success",
      });
      mainStore.isShowAddNav = false;
      axiosInstance.get("/nav/list").then( res => {
        if (res.status === 200)mainStore.nav_list = res.data
      })
    }
  });
}

function isAddNav() {
  mainStore.isShowAddNav =  true;
}
</script>
<style  scoped>
.right {
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  width: 350px;
  height: 70%;
  top: 20vh;
  background-color: transparent;
  transition: 0.5s;
  right: -300px;
  cursor: pointer;
  padding-left: 80px;
  box-sizing: border-box;
}

.right:hover {
  right: 0px;
}
.right .link-list h3{
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  padding-left: 16px;
}
.right .link-list {
  border-radius: 24px 0 0 24px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.2);
  overflow: auto;
  padding-top: 12px;
  font-size: 12px;
}
.right .link-list .text{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 6px;
}

.right .link-list::-webkit-scrollbar {
  display: none;
}

.right .link-list .button {
  width: calc(50% - 24px);
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgba(235, 189, 146, 0.76) 0, rgba(165, 106, 169, 0.29) 58%);
  border-radius: 4px;
  color: #fff;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 12px;
  box-sizing: border-box;
}
.right .link-list .button .img{
  margin:6px;
  display: inline-block;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5px);
}
.right .link-list .button .img img{
  position: relative;
  top: 8px;
}
.right .link-list .button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.right .link-list .button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
.close {
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  position: absolute;
  right: 6px;
  top: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}
.close2{
  top: 20px;
}
</style>
