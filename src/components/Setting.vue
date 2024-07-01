<template>
  <div class="setting">
    <el-button class="close" @click="closeSetting" circle>
      <img src="../assets/images/close.svg" alt="close">
    </el-button>
    <div class="user-info">
      欢迎！<span>{{ mainStore.username }}</span>
      <el-button @click="loginOut" type="primary" link> 退出</el-button>
    </div>
    <div class="content">
      <div class="item">
        <div class="title">背景设置</div>
        <div class="card">
          <label for="imageUpload" class="custom-file-upload">
            <input v-show="false" type="file" id="imageUpload" ref="fileInput" @change="onFileChange"
                   accept="image/*">
            <span class="upload-button">{{ btn_text }}</span>
          </label>
          <span @click="delBgImage" class="upload-button">删除背景</span>
          <div class="upload-tip">
            当前背景:{{ bg_name }}
          </div>
          <div class="upload-tip">
            背景图片限制大小为2.5M
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          侧边导航
          <el-button class="close" @click="openEditNav" circle>
            <img src="../assets/images/setting.svg" alt="close">
          </el-button>
        </div>
        <div class="card">
          <el-radio-group v-model="mainStore.is_nav">
            <el-radio value="1">开启导航</el-radio>
            <el-radio value="2">关闭导航</el-radio>
          </el-radio-group>
          <el-radio-group :disabled="mainStore.is_nav==='2'" v-model="mainStore.nav_type">
            <el-radio value="1">默认导航</el-radio>
            <el-radio value="2">右侧导航</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { useCookieAuth } from "@/hook/useAuth";
import { ref, onMounted, defineEmits, watchEffect, watch } from "vue";
import axiosInstance from "@/axios"; // 导入你的axios实例
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/useMainStore";

const mainStore = useMainStore();
const router = useRouter();
const { removeToken } = useCookieAuth();
// 获取设置信息
const bg_name = ref("获取中...");
const btn_text = ref("选择图片");
onMounted(() => {
  axiosInstance.get("/user/bg/name").then(res => {
    if (res.status === 200) {
      bg_name.value = res.data.bg_name || "暂无背景图";
    }
  });
});
watch([() => mainStore.is_nav, () => mainStore.nav_type], (newVal, oldVal) => {
  if (oldVal[0] && oldVal[1]) {
    axiosInstance.post("/user/update", {
      is_nav: mainStore.is_nav,
      nav_type: mainStore.nav_type,
    }).then(res => {
      if (mainStore.is_nav === "1") {
        axiosInstance.get("/nav/list").then(res => {
          if (res.status === 200) mainStore.nav_list = res.data;
        });
      }
    });
  }
});


// 编辑导航列表
function openEditNav() {
  mainStore.isEditNav = true;
  emit("closeSetting");
}

// 删除图片
function delBgImage() {
  axiosInstance.post("/delete/bg").then(res => {
    if (res.status === 200) {
      bg_name.value = "暂无背景图";
      ElMessage({
        message: "delete success",
        type: "success",
      });
      localStorage.setItem("bg_base64", "");
      document.getElementById("yuwbNav").style.backgroundImage = "";
    }
  });
}

// 上传图片
const fileInput = ref(null);
const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

function onFileChange() {
  const file = fileInput.value.files[0];
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      ElMessage.error("文件大小超过限制（2.5MB）！");
      fileInput.value.value = "";
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    btn_text.value = "上传中...";
    axiosInstance.post("/upload/bg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
      if (res.status === 200) {
        bg_name.value = res.data.bg_name;
        ElMessage({
          message: "Upload success",
          type: "success",
        });
        // 上传成功，同时更新
        const reader = new FileReader();
        reader.onload = function(e) {
          const base64String = e.target.result;
          localStorage.setItem("bg_base64", base64String);
          document.getElementById("yuwbNav").style.backgroundImage = `url(${base64String})`;
        };
        reader.onerror = function(error) {
          console.error("Error reading file:", error);
        };
        reader.readAsDataURL(file);
      } else {
        ElMessage.error("Upload error");
      }
      btn_text.value = "上传图片";
    }).catch(e => {
      ElMessage.error("Upload error");
      btn_text.value = "上传图片";
    });
  }
}


const emit = defineEmits(["closeSetting"]);

function closeSetting() {
  emit("closeSetting");
}

function loginOut() {
  removeToken();
  router.go(0);
}
</script>
<style scoped>
.setting {
  z-index: 999;
  width: 50%;
  min-width: 375px;
  min-height: 560px;
  max-height: 560px;
  overflow: auto;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  color: #666;
}

.setting::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

.setting::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}

.user-info {
  margin-bottom: 12px;
}

.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.content .item {
  margin: 12px;
  width: 260px;
  background: linear-gradient(90deg, #ebbd923e, #a96aa24b 58%);
  height: 128px;
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.2);
}

.item .title {
  position: relative;
  padding: 6px 16px;
  color: #666;
}

.item .title .close {
  top: 12px;
}

.item .card {
  padding: 6px 16px;
}

.upload-button {
  cursor: pointer;
  margin-right: 12px;
  padding: 4px 24px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  outline: none;
  border: none;
}

.upload-button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.upload-button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}

.upload-tip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  margin: 8px 0;
  color: #666;
}


.close {
  outline: none;
  border: none;
  position: absolute;
  top: 26px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

:deep(.el-radio__label) {
  color: #666;
}
</style>
