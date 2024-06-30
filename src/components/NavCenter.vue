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

<template>
  <div>
    <h3 class="title">导航列表 </h3>
    <el-button @click.stop="mainStore.isEditNav = false" v-if="mainStore.isEditNav" class="close" circle>
      <img height="18px" src="@/assets/right.svg" alt="close">
    </el-button>
    <div class="nav-center">
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

<style scoped>
.title {
  padding-left: 16px;
  margin-top: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: normal;
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

.nav-center {
  display: flex;
  flex-wrap: wrap;
}

.nav-center .text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px 12px;
  font-size: 12px;
}


.nav-center .button {
  position: relative;
  flex: 1;
  min-width: 100px;
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgba(235, 189, 146, 0.76) 0, rgba(165, 106, 169, 0.29) 58%);
  border-radius: 16px;
  color: #fff;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 12px;
  box-sizing: border-box;
}

.nav-center .button.add-nav {
  background: linear-gradient(90deg, rgb(235, 189, 146) 0, rgb(165, 106, 169) 58%);
}

.nav-center .button .img {
  margin: 12px;
  display: inline-block;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5px);
}

.nav-center .button .img img {
  position: relative;
  top: 8px;
}

.nav-center .button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.nav-center .button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}

</style>