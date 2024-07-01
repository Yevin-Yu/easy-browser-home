<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/useMainStore";
import { ElMessage } from "element-plus";
import axiosInstance from "@/axios"; // 导入你的axios实例
const mainStore = useMainStore();
const params = reactive({
  name: "",
  icon_path: "",
  link_path: "",
});

function closeAddNav() {
  mainStore.isShowAddNav = false;
}

function addNav() {
  if (!params.name || !params.icon_path || !params.link_path) {
    ElMessage.error("输入内容不能为空");
    return;
  }
  axiosInstance.post("/nav/add",params).then(res => {
    if (res.status === 200) {
      ElMessage({
        message: "add success",
        type: "success",
      });
      mainStore.isShowAddNav = false;
      axiosInstance.get("/nav/list").then( res => {
        if (res.status === 200)mainStore.nav_list = res.data
      })
    }
  });
}
</script>

<template>
  <div class="add-nav">
    <el-button class="close" circle @click="closeAddNav">
      <img height="12px" src="../assets/images/close.svg" alt="close">
    </el-button>
    <el-form label-position="top" label-width="auto" :model="params">
      <el-form-item label="Name">
        <el-input v-model="params.name" />
      </el-form-item>
      <el-form-item label="Icon Path">
        <el-input v-model="params.icon_path" />
      </el-form-item>
      <el-form-item label="Link Path">
        <el-input v-model="params.link_path" />
      </el-form-item>
    </el-form>
    <button @click="addNav" class="sub_button">添加导航</button>
  </div>
</template>

<style scoped>
.add-nav {
  z-index: 999;
  min-width: 375px;
  max-width: 600px;
  min-height: 360px;
  max-height: 360px;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  color: #eee;
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

.sub_button {
  outline: none;
  border: none;
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
}

:deep(.el-form-item__label) {
  color: #666;
}
</style>