<template>
    <div class="setting-main">

        <div class="item-card">
            <h3>同步数据</h3>
            <button @click="downloadLocalStorage">导出数据</button>
            <label for="jsonUpload" class="custom-file-upload">
                <input v-show="false" type="file" id="jsonUpload" ref="fileInputRef" accept=".json" />
                <span class="button">导入数据</span>
            </label>
            <p class="tips">请注意：该导入导出数据，只适用于未登陆用户。已登陆用户会根据登陆账号自动同步数据。</p>
            <p class="tips">请注意：登录用户同步数据，包括待办，导航，新闻，笔记。其他主题背景和搜索引擎暂时不支持同步，只保存在本地。</p>
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
                    <li v-for="(item, index) in navItems" @click="openEditNav(item, index)" :key="item.name">
                        <div>
                            <img :src="item.iconPath" alt="icon" @error="onImageError(item)" />
                        </div>
                        <span class="item-name">{{ item.name }}</span>
                    </li>
                    <li @click="openAddNav">
                        <div>
                            <img src="@/assets/icon/add.svg" alt="icon" />
                        </div>
                        <span>添加</span>
                    </li>
                </ul>
            </div>
            <p class="tips">点击导航图标可以修改或者删除单个导航，长按可以拖动图标排序。</p>
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
    <el-dialog v-model="isShowAddNav" :show-close="false" :title="navParams.id ? '添加导航' : '修改导航'" width="500">
        <div class="add-nav">
            <h3>导航名称</h3>
            <input type="text" v-model="navParams.name" />
            <h3>图标链接</h3>
            <input type="text" v-model="navParams.iconPath" />
            <h3>网站链接</h3>
            <input type="text" v-model="navParams.linkPath" />
        </div>
        <p class="tips">注意：图标链接加载失败或为空，会使用默认图标</p>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-if="isEditNav" @click="delNav" type="primary">删除</el-button>
                <el-button v-else @click="isShowAddNav = false">取消</el-button>
                <el-button v-if="isEditNav" type="primary" @click="submitEditNav">修改</el-button>
                <el-button v-else type="primary" @click="addNav">添加</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import Sortable from "sortablejs";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive, watchEffect, inject, watch } from "vue";
// 获取用户信息 是否登陆
import { useUserStore } from '@/stores/useAuthStore'
let { isLogin } = storeToRefs(useUserStore());
// 引入NavMenu
import { useNavStore } from "@/stores/useNavStore"
let { loadNavMenu, addNavMenu, editNavMenu, delNavMenu, updateNavMenuSort } = useNavStore();
let { navItems } = storeToRefs(useNavStore());
// 加载NavMenu
watch(isLogin, () => {
    loadNavMenu(isLogin.value)
})
// 添加导航
let isShowAddNav = ref(false);
let isEditNav = ref(false);
let editIndex = ref(0);
const navParams = reactive({ id: "", name: "", iconPath: "", linkPath: "" });
function openAddNav() {
    isEditNav.value = false;
    isShowAddNav.value = true;
    navParams.id = "";
    navParams.name = "";
    navParams.iconPath = "";
    navParams.linkPath = "";
}
async function addNav() {
    if (navParams.name && navParams.linkPath) {
        await addNavMenu(isLogin.value, navParams)
        isShowAddNav.value = false;
        // 清空表单
        navParams.id = "";
        navParams.name = "";
        navParams.iconPath = "";
        navParams.linkPath = "";
    } else {
        ElMessage({
            message: "请输入导航名称和网站链接",
            type: "warning",
        });
    }
}
// 修改导航
function openEditNav(item, index) {
    isEditNav.value = true;
    editIndex.value = index;
    navParams.id = item.id;
    navParams.name = item.name;
    navParams.iconPath = item.iconPath;
    navParams.linkPath = item.linkPath;
    isShowAddNav.value = true;
}
async function submitEditNav() {
    if (navParams.name && navParams.linkPath) {
        await editNavMenu(isLogin.value, navParams)
        isShowAddNav.value = false;
        // 清空表单
        navParams.id = "";
        navParams.name = "";
        navParams.iconPath = "";
        navParams.linkPath = "";
    } else {
        ElMessage({
            message: "请输入导航名称和网站链接",
            type: "warning",
        });
    }
}
// 删除导航
async function delNav() {
    console.log(navParams, editIndex.value)
    await delNavMenu(isLogin.value, navParams, editIndex.value)
    isShowAddNav.value = false;
    // 清空表单
    editIndex.value = 0;
    navParams.id = "";
    navParams.name = "";
    navParams.iconPath = "";
    navParams.linkPath = "";
}
// 导航排序
const navsList = ref(null);
onMounted(() => {
    Sortable.create(navsList.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = navItems.value.splice(oldIndex, 1)[0];
            navItems.value.splice(newIndex, 0, item);
            updateNavMenuSort(isLogin.value, navItems.value)
        },
    });
})
// 主题切换
import { useTheme } from "@/hook/useTheme";
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

// 图片加载失败
function onImageError(item) {
    item.iconPath = "https://yuwb.cn/nav/pwa.png";
}
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
            padding-left: 0;
            justify-content: center;

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
                        display: block;
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

.tips {
    color: #999;
    font-size: 12px;
    margin-top: 20px;
    padding: 0 12px;
    text-align: center;
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