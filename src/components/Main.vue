<template>
    <el-dialog :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }" v-model="isShow"
        :close-on-click-modal="false" :modal="false" top="50px" title="待办" width="calc(100% - 160px)"
        :before-close="closeDialog">
        <div class="main">
            <!-- 待办 -->
            <div class="left-todo">
                <div class="title">
                    <span class="edit" @click="isEdit = !isEdit">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                    待办列表
                    <span class="add" @click="addTodoClick">+</span>
                </div>
                <ul ref="todosListRef">
                    <li v-for="(item, index) in todoItems" :key="item.id">
                        <span class="checkbox" :class="{ 'checked': item.checked }"
                            @click.stop="changeTodoStatus(item)">
                            <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M694.044 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M329.956 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                        </span>
                        <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                            v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                        <span v-else class="todo-text">{{ item.title }}</span>
                        <span class="del-btn" v-if="isEdit" @click="delTodoClick(item, index)">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="left-todo">
                <div class="title">
                    <span class="edit" @click="isEdit = !isEdit">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                    待办列表
                    <span class="add" @click="addTodoClick">+</span>
                </div>
                <ul ref="todosListRef">
                    <li v-for="(item, index) in todoItems" :key="item.id">
                        <span class="checkbox" :class="{ 'checked': item.checked }"
                            @click.stop="changeTodoStatus(item)">
                            <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M694.044 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M329.956 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                        </span>
                        <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                            v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                        <span v-else class="todo-text">{{ item.title }}</span>
                        <span class="del-btn" v-if="isEdit" @click="delTodoClick(item, index)">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="left-todo">
                <div class="title">
                    <span class="edit" @click="isEdit = !isEdit">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                    待办列表
                    <span class="add" @click="addTodoClick">+</span>
                </div>
                <ul ref="todosListRef">
                    <li v-for="(item, index) in todoItems" :key="item.id">
                        <span class="checkbox" :class="{ 'checked': item.checked }"
                            @click.stop="changeTodoStatus(item)">
                            <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M694.044 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z">
                                </path>
                                <path fill="currentColor"
                                    d="M329.956 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454m0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088">
                                </path>
                            </svg>
                        </span>
                        <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                            v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                        <span v-else class="todo-text">{{ item.title }}</span>
                        <span class="del-btn" v-if="isEdit" @click="delTodoClick(item, index)">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import Sortable from "sortablejs";
import { storeToRefs } from "pinia";
import { ref, onMounted, inject, watch } from "vue";
const isMobile = inject('isMobile');


import { useRouter } from 'vue-router';
const router = useRouter();
const isShow = ref(true)
// 设置弹窗关闭
function closeDialog() {
    isShow.value = false
    // 跳转到首页
    router.push('/');
}


// 获取用户信息 是否登陆
import { useUserStore } from '@/stores/useAuthStore'
let { isLogin } = storeToRefs(useUserStore());
// 加载NavMenu
import { useNavStore } from "@/stores/useNavStore"
let { loadNavMenu } = useNavStore();
let { navItems } = storeToRefs(useNavStore());
// 加载NavMenu
watch(isLogin, () => {
    loadNavMenu(isLogin.value)
})
// 加载TodoList
import { useTodoStore } from "@/stores/useTodoStore"
let { loadTodos, editTodo, delTodo, addTodo, updateTodoSort } = useTodoStore();
let { todoItems } = storeToRefs(useTodoStore());
watch(isLogin, () => {
    loadTodos(isLogin.value)
})
// 新增Todo
function addTodoClick() {
    let data = {
        id: new Date().getTime(),
        title: "新建Todo",
        checked: false,
    };
    addTodo(isLogin.value, data)
}
// 修改状态
function changeTodoStatus(params) {
    params.checked = !params.checked;
    editTodo(isLogin.value, params)
}
// 修改内容
let timeoutId;
function changeTodoTitle(params, event) {
    // 清除之前的定时器
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    const copyParams = JSON.parse(JSON.stringify(params));
    // 设置新的定时器
    timeoutId = setTimeout(() => {
        editTodo(isLogin.value, copyParams)
    }, 2000);
}
// 删除Todo
let isEdit = ref(false);
function delTodoClick(params, index) {
    delTodo(isLogin.value, params, index)
}
// 排序
const todosListRef = ref(null);
onMounted(() => {
    if (!isMobile) {
        // Sortable.create(todosListRef.value, {
        //     group: "shared",
        //     animation: 150,
        //     ghostClass: "ghost",
        //     onEnd: ({ newIndex, oldIndex }) => {
        //         const item = todoItems.value.splice(oldIndex, 1)[0];
        //         todoItems.value.splice(newIndex, 0, item);
        //         updateTodoSort(isLogin.value, todoItems.value)
        //     },
        // });
    }
})
// 图片加载失败
function onImageError(item) {
    item.iconPath = "https://yuwb.cn/nav/pwa.png";
}
function go(item) {
    window.open(item.linkPath);
}
</script>
<style lang="less" scoped>
.main::-webkit-scrollbar,
.left-todo::-webkit-scrollbar,
.right::-webkit-scrollbar,
ul::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.main::-webkit-scrollbar-thumb,
.left-todo::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb,
ul::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.main {
    width: 70vw;
    height: 60vh;
    margin: 5vh auto 0;
    overflow: hidden;
    display: flex;
    padding: 20px;

    .left-todo {
        border-radius: 15px;
        width: 320px;
        height: 100%;
        background: var(--bgColorDefaut);
        box-shadow: var(--shadow);
        border: var(--border);
        color: var(--fontColor);
        padding: 16px;
        margin-right: 20px;
    }

    .title {
        padding: 0 56px 0;
        position: relative;
        line-height: 32px;

        .add {
            display: block;
            position: absolute;
            right: 6px;
            cursor: pointer;
            top: -1px;
            width: 32px;
            height: 32px;
            font-size: 24px;
        }
    }

    .edit {
        cursor: pointer;
        display: block;
        position: absolute;
        left: 6px;
        top: 0;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        background: var(--notesBg);
        box-shadow: var(--notesShadowActive);
        text-align: center;

        svg {
            width: 16px;
            height: 16px;
            position: relative;
            top: 2px;
        }
    }

    .del-btn {
        cursor: pointer;
        display: block;
        position: absolute;
        right: 8px;
        top: 16px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        background: var(--notesBg);
        box-shadow: var(--shadow);
        text-align: center;

        svg {
            width: 16px;
            height: 16px;
            position: relative;
            top: -13px;
        }
    }

    .del-btn:hover,
    .del-btn:active {
        box-shadow: var(--notesShadowActive);
    }

    .left-todo {
        overflow: hidden;
        padding-right: 0;

        ul {
            padding-left: 0;
            list-style: none;
            overflow-x: hidden;
            overflow-y: auto;
            height: calc(100% - 35px);
            margin: 6px 0 12px 0;
            padding-right: 16px;

            li {
                cursor: pointer;
                position: relative;
                width: 275px;
                height: 56px;
                line-height: 56px;
                border-radius: 12px;
                padding: 0 20px 0 12px;
                background: var(--notesBg);
                box-shadow: var(--notesShadow);
                border: var(--border);
                color: var(--fontColor);
                margin: 16px 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 30px;
            }

            li.active {
                box-shadow: var(--notesShadowActive);
            }

            li:hover,
            li:active {
                box-shadow: var(--notesShadowActive);
            }

            .checkbox {
                margin-right: 12px;
                display: inline-block;
                height: 28px;
                width: 38px;
                line-height: 28px;
                border-radius: 10px;
                position: absolute;
                left: 10px;
                top: 14px;
                background: var(--notesBg);
                box-shadow: var(--notesShadow);
                border: var(--border);
                color: var(--fontColor);
                vertical-align: middle;

                svg {
                    position: relative;
                    top: 1px;
                    left: 6px;
                    width: 24px;
                }
            }

            .checkbox.checked {
                color: #999;
            }

            .todo-input {
                margin-left: 50px;
                outline: none;
                border: none;
                height: 28px;
                background: transparent;
                border: var(--border);
                color: var(--fontColor);
                padding: 0;
                font-size: 14px;
                width: 190px;
            }

            .todo-text {
                margin-left: 50px;
                font-size: 14px;
                text-decoration: line-through;
                color: #999;
            }

            .checkbox:hover,
            .checkbox:active {
                box-shadow: var(--notesShadowActive);
            }
        }
    }

}
</style>
