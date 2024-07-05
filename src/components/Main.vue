<template>
    <div class="main">
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
                <span class="add" @click="addTodo">+</span>
            </div>
            <ul ref="todosListRef">
                <li v-for="(item, index) in store.todosList" :key="item.id">
                    <span class="checkbox" @click.stop="item.checked = !item.checked">
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
                    <input class="todo-input" v-if="!item.checked" v-model="item.title" type="text">
                    <span v-else class="todo-text">{{ item.title }}</span>
                    <span class="del-btn" v-if="isEdit" @click="delTodo(index)">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                </li>
            </ul>
        </div>
        <div class="right">

        </div>
    </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { ref, onMounted } from 'vue'
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();
// 初始加载
onMounted(() => {
    const todosList = JSON.parse(localStorage.getItem("todosList"));
    if (todosList) store.todosListChange(todosList);
    // 排序
    const notesSortable = Sortable.create(todosListRef.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = store.todosList.splice(oldIndex, 1)[0];
            store.todosList.splice(newIndex, 0, item);
            localStorage.setItem("todosList", JSON.stringify(store.todosList));
        },
    });
});
// 新建删除
let isEdit = ref(false);
function addTodo() {
    const data = {
        id: new Date().getTime(),
        title: "新建Todo",
        checked: false,
    };
    store.todosList.push(data);
    localStorage.setItem("todosList", JSON.stringify(store.todosList));
}
// 删除
function delTodo(index) {
    store.todosList.splice(index, 1);
    localStorage.setItem("todosList", JSON.stringify(store.todosList));
}
// 排序
const todosListRef = ref(null);
</script>

<style lang="less" scoped>
.main::-webkit-scrollbar,
.left-todo::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.main::-webkit-scrollbar-thumb,
.left-todo::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.main {
    width: 70vw;
    height: 60vh;
    margin: 8vh auto;
    overflow: hidden;
    display: flex;
    padding: 20px;

    .left-todo {
        border-radius: 15px;
        width: 320px;
        height: 100%;
        background-color: #aaa;
        overflow: auto;
        background: var(--bgColorDefaut);
        box-shadow: var(--shadow);
        border: var(--border);
        color: var(--fontColor);
        padding: 12px;
        margin-right: 20px;
    }

    .title {
        padding: 0 56px 0;
        position: relative;
        line-height: 32px;

        .add {
            display: block;
            position: absolute;
            right: -10px;
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
        ul {
            padding-left: 0;
            list-style: none;

            li {
                cursor: pointer;
                position: relative;
                width: 285px;
                height: 56px;
                line-height: 56px;
                border-radius: 12px;
                padding: 0 12px;
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
                    color: var(--fontColor);
                }
            }

            .todo-input {
                outline: none;
                border: none;
                height: 28px;
                background: transparent;
                border: var(--border);
                color: var(--fontColor);
                padding: 0;
                font-size: 14px;
            }
            .todo-text{
                font-size: 14px;
            }

            .checkbox:hover,
            .checkbox:active {
                box-shadow: var(--notesShadowActive);
            }
        }
    }

    .right {
        flex: 1;
        
    }
}
</style>
