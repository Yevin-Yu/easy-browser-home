<template>
  <div class="setting">
    <el-button class="close" @click="closeSetting" circle>关</el-button>
    <div class="user-info">
      欢迎！<span>{{ username }}</span>
      <el-button @click="loginOut" type="primary" link> 退出</el-button>
    </div>
    <div class="content">
      <div class="item">
        <div class="title">背景设置</div>
        <div class="card">
          <label for="imageUpload" class="custom-file-upload">
            <input v-show="false" type="file" id="imageUpload" ref="fileInput" @change="onFileChange"
                   accept="image/*">
            <span class="upload-button">选择图片</span>
          </label>
          <span class="upload-button">删除背景</span>
          <div class="upload-tip" style="color:#ccc;">
            当前背景:{{ bg_name }}
          </div>
          <div class="upload-tip" style="color:#ccc;">
            上传后刷新页面，重新加载背景
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">侧边导航</div>
        <div class="card">

        </div>
      </div>
      <!-- <div class="item">
          <div class="title">待办列表</div>
          <div class="card">

          </div>
      </div>
      <div class="item">
          <div class="title">备忘录</div>
          <div class="card">

          </div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { useCookieAuth } from "@/hook/useAuth";
import { ref, onMounted, defineEmits } from "vue";
import axiosInstance from "@/axios"; // 导入你的axios实例
import { useRouter } from "vue-router";

const router = useRouter();
const { token, setToken, removeToken } = useCookieAuth();
// 获取背景信息
const username = ref("");
const bg_name = ref("获取中...");
const btn_text = ref("选择图片");
onMounted(() => {
  axiosInstance.get("/user/info").then(res => {
    if (res.status === 200) {
      username.value = res.data.username;
    }
  });
  axiosInstance.get("/user/bg/name").then(res => {
    if (res.status === 200) {
      bg_name.value = res.data.bg_name || "暂无背景图";
    }
  });
});

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
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  color: #eee;
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
  padding: 6px 16px;
  color: #eee;
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
}

.upload-tip {
  margin: 8px 0;
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
</style>
