<template>
    <div class="setting-main">

        <div class="item-card">
            <h3>同步数据</h3>
            <button @click="downloadLocalStorage">导出数据</button>
            <label for="jsonUpload" class="custom-file-upload">
                <input v-show="false" type="file" id="jsonUpload" ref="fileInputRef" accept=".json" />
                <span class="button">导入数据</span>
            </label>
        </div>
        <div class="item-card">
            <h3>主题设置</h3>
            <button @click="theme.toggleTheme">切换主题</button>
            <span class="tip">[ 可以根据需要，调整主题色，适应亮色背景或者暗色背景 ]</span> <br />
            <label for="imageUpload" class="custom-file-upload">
                <input v-show="false" type="file" id="imageUpload" ref="fileInput" @change="onFileChange"
                    accept="image/*" />
                <span class="button">设置背景图片</span>
            </label>
            <button @click="delFile">删除背景</button>
            <span class="tip">[ 上传图片，设置为背景，同步背景需要登陆 ]</span>
        </div>
        <div class="item-card">
            <h3>搜索引擎</h3>
            <button @click="store.searchEngineChange(item.value)"
                :class="{ 'active': store.searchEngine === item.value }" v-for="item in list" :key="item.value">
                {{ item.label }}
            </button>
        </div>
        <div class="item-card">
            <h3>导航设置</h3>
            <div class="nav-list">
                <ul ref="navsList">
                    <li v-for="(item, index) in store.navMenu" @click="go(item)" :key="item.name">
                        <div>
                            <img :src="item.iconPath" alt="icon" />
                        </div>
                        <span class="item-name">{{ item.name }}</span>
                        <img @click="delNav(index)" class="del-icon" src="@/assets/icon/close.svg" alt="" />
                    </li>
                    <li @click="dialogVisible = true">
                        <div>
                            <img src="@/assets/icon/add.svg" alt="icon" />
                        </div>
                        <span>添加</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="item-card">
            <h3>新闻排序</h3>
            <div ref="newsList" class="news-list">
                <button v-for="item in store.newsMenu" :key="item">
                    {{ item.label }}
                </button>
            </div>
        </div>
    </div>
    <!-- 添加导航 -->
    <el-dialog v-model="dialogVisible" :show-close="false" title="添加导航" width="500">
        <div class="add-nav">
            <h3>名字</h3>
            <input type="text" v-model="navParams.name" />
            <h3>图标链接</h3>
            <input type="text" v-model="navParams.iconPath" />
            <h3>网站链接</h3>
            <input type="text" v-model="navParams.linkPath" />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addNav"> 添加 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import Sortable from "sortablejs";
// 主题切换
import { useTheme } from "@/hook/useTheme";
import { onMounted, reactive, ref } from "vue";

// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();

// 初始化主题
let theme = useTheme();
// 下载数据
import { useLocalStorageIO } from '@/hook/useLocalStorage'
const { downloadLocalStorage, fileInputRef } = useLocalStorageIO();
onMounted(() => {
    // 默认主题
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) theme.currentTheme.value = currentTheme;
    // 默认引擎
    const searchEngine = localStorage.getItem("searchEngine");
    if (searchEngine) store.searchEngineChange(parseInt(searchEngine));
    // 默认导航
    const navMenu = JSON.parse(localStorage.getItem("navMenu"));
    if (navMenu) store.navMenuChange(navMenu);
    // 调整顺序初始化
    const sortable = Sortable.create(newsList.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = store.newsMenu.splice(oldIndex, 1)[0];
            store.newsMenu.splice(newIndex, 0, item);
            localStorage.setItem("newsMenu", JSON.stringify(store.newsMenu));
        },
    });
    const navsSortable = Sortable.create(navsList.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = store.navMenu.splice(oldIndex, 1)[0];
            store.navMenu.splice(newIndex, 0, item);
            localStorage.setItem("navMenu", JSON.stringify(store.navMenu));
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
const newsList = ref(null);
// 导航
const navsList = ref(null);
// 添加导航
const navParams = reactive({
    name: "",
    iconPath: "",
    linkPath: "",
});
function addNav() {
    if (navParams.name && navParams.iconPath && navParams.linkPath) {
        store.navMenu.push(navParams);
        localStorage.setItem("navMenu", JSON.stringify(store.navMenu));
        dialogVisible = false;
        navParams.name = "";
        navParams.iconPath = "";
        navParams.linkPath = "";
    }
}
function delNav(index) {
    store.navMenu.splice(index, 1);
    localStorage.setItem("navMenu", JSON.stringify(store.navMenu));
}
let dialogVisible = ref(false);
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

        .news-list {
            text-align: center;
        }

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

    .nav-list {
        ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            display: inline-block;
            padding-left: 0;

            li {
                display: inline-block;
                margin: 12px 25px;
                text-align: center;
                width: 80px;
                position: relative;

                div {
                    cursor: pointer;
                    border-radius: 17px;
                    min-width: 80px;
                    height: 80px;
                    border: var(--border);
                    background-color: var(--bgColorDefaut);
                    box-shadow: var(--shadow);

                    img {
                        padding: 12px;
                        background-color: #fff;
                        width: 50px;
                        height: 50px;
                        margin: 14px;
                        border-radius: 15px;
                        background-color: rgba(255, 255, 255, 0.5);
                    }
                }

                div:hover,
                div:active {
                    box-shadow: var(--sideShadowActive);

                    img {
                        box-shadow: var(--shadow);
                    }
                }

                span {
                    width: 80px;
                    display: inline-block;
                    margin-top: 12px;
                    font-size: 12px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: var(--fontColor);
                }

                .del-icon {
                    position: absolute;
                    right: -10px;
                    top: -10px;
                    color: var(--fontColor);
                    cursor: pointer;
                }
            }
        }
    }
}

.dialog-footer {
    text-align: center;
}

.el-dialog .add-nav {
    h3 {
        color: var(--fontColor);
        padding: 12px;
    }

    input {
        outline: none;
        border: none;
        color: #333;
        background-color: #fff;
        height: 38px;
        width: 320px;
        border-radius: 16px;
        padding: 0 24px;
    }
}

.isMobile {
    .setting-main {
        width: 90vw;
        margin: 5vh auto;

        .item-card {

            button,
            .button {
                width: 120px;
                font-size: 18px;
            }

            .tip {
                display: block
            }

            .item-name {
                font-size: 18px;
            }
        }

        ul {
            width: 100%;
            text-align: center;
        }
    }

}
</style>