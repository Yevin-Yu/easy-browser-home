<template>
    <div class="setting-main">
        <div class="item-card">
            <h3>主题设置</h3>
            <button @click="theme.toggleTheme">切换主题</button>
            <span>[ 可以根据需要，调整主题色，适应亮色背景或者暗色背景 ]</span> <br />
            <label for="imageUpload" class="custom-file-upload">
                <input v-show="false" type="file" id="imageUpload" ref="fileInput" @change="onFileChange" accept="image/*" />
                <span class="button">设置背景图片</span>
            </label>
            <button @click="delFile">删除背景</button>
            <span>[ 上传图片，设置为背景，同步背景需要登陆 ]</span>
        </div>
        <div class="item-card">
            <h3>搜索引擎</h3>
            <button @click="store.searchEngineChange(item.value)" :class="{'active':store.searchEngine === item.value}" v-for="item in list" :key="item.value">
                {{item.label}}
            </button>
        </div>
        <div class="item-card">
            <h3>新闻排序</h3>
            <div ref="draggableList">
                <button v-for="item in TYPE" :key="item">
                    {{item}}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import Sortable from 'sortablejs';
// 主题切换
import { useTheme } from "@/hook/useTheme";
import { onMounted, reactive, ref } from "vue";

// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();

// 初始化主题
let theme = useTheme();
onMounted(() => {
    // 默认主题
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) theme.currentTheme.value = currentTheme;
    // 默认引擎
    const searchEngine = localStorage.getItem("searchEngine");
    if (searchEngine) store.searchEngineChange(parseInt(searchEngine));
    // 调整顺序初始化
   
        const sortable = Sortable.create(draggableList.value, {
            group: "shared",
            animation: 150,
            ghostClass: "ghost",
            onEnd: ({ newIndex, oldIndex }) => {
                const item = TYPE.splice(oldIndex, 1)[0];
                TYPE.splice(newIndex, 0, item);
            },
        });
    
});
// 搜索引擎列表
const list = reactive([
    { label: "Bing", value: 1 },
    { label: "Google", value: 2 },
    { label: "DuckDuckGo", value: 3 },
    { label: "百度", value: 4 },
]);
// 上传图片
const fileInput = ref(null);
const MAX_FILE_SIZE = 2.5 * 1024 * 1024;
function onFileChange() {
    const file = fileInput.value.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
        ElMessage.error("文件大小超过限制（2.5MB）！");
        fileInput.value.value = "";
        return;
    }
    // 保存图片为base64
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64String = e.target.result;
        localStorage.setItem("bgBase64", base64String);
        document.getElementById("app").style.backgroundImage = `url(${base64String})`;
    };
    reader.onerror = function (error) {
        console.error("Error reading file:", error);
    };
    reader.readAsDataURL(file);
}
// 删除图片
function delFile() {
    localStorage.removeItem("bgBase64");
    document.getElementById("app").style.backgroundImage = "";
}
// 新闻排序
const TYPE = ["juejin", "weibo", "douyin", "zhihu", "bilibili", "36kr", "baidu", "sspai", "ithome", "toutiao", "thepaper", "tieba"];
const draggableList = ref(null);
</script>
  
<style lang="less" scoped>
.setting-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.setting-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
    box-shadow: var(--shadow);
}
.setting-main {
    width: 60vw;
    height: 55vh;
    margin: 7.5vh auto;
    overflow: auto;
    padding: 24px;
    .item-card {
        margin-bottom: 20px;
        border-radius: 15px;
        background: var(--bgColorDefaut);
        box-shadow: var(--shadow);
        border: var(--border);
        color: var(--fontColor);
        padding: 12px;
        h3 {
            padding: 12px 0;
        }
        button,
        .button {
            font-size: 13px;
            text-align: center;
            display: inline-block;
            margin: 12px;
            cursor: pointer;
            width: 130px;
            height: 40px;
            line-height: 40px;
            border-radius: 55px;
            background: var(--bgColorDefaut);
            box-shadow: var(--shadow);
            border: var(--border);
            color: var(--fontColor);
        }
        button.active {
            box-shadow: var(--sideShadowActive);
        }
        button:hover,
        button:active,
        .button:hover,
        .button:active {
            box-shadow: var(--sideShadowActive);
        }
    }
}
</style>