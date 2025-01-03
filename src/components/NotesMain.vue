<template>
    <el-dialog :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }" v-model="isShow"
        :close-on-click-modal="false" :modal="false" top="50px" title="笔记" width="calc(100% - 160px)"
        :before-close="closeDialog">
        <div class="notes-main">
            <div class="left" v-if="!isMobile || (isMobile && !isShowNotes)">
                <div class="title">
                    <span class="title-text">笔记列表</span>
                    <span class="edit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <g fill="none">
                                <path fill="url(#fluentColorDocumentFolder160)"
                                    d="M5 5.5A1.5 1.5 0 0 1 6.5 4h5A1.5 1.5 0 0 1 13 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5z" />
                                <path fill="url(#fluentColorDocumentFolder161)"
                                    d="M5 5.5A1.5 1.5 0 0 1 6.5 4h5A1.5 1.5 0 0 1 13 5.5v5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5z" />
                                <path fill="url(#fluentColorDocumentFolder163)"
                                    d="M3 3.5A1.5 1.5 0 0 1 4.5 2h5A1.5 1.5 0 0 1 11 3.5v7A1.5 1.5 0 0 1 9.5 12h-5A1.5 1.5 0 0 1 3 10.5z" />
                                <path fill="url(#fluentColorDocumentFolder162)"
                                    d="M3.5 5A1.5 1.5 0 0 0 2 6.5V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-.5a1.5 1.5 0 0 0-1.5-1.5h-1.586a.5.5 0 0 1-.353-.146L6.146 5.439A1.5 1.5 0 0 0 5.086 5z" />
                                <defs>
                                    <linearGradient id="fluentColorDocumentFolder160" x1="14.2" x2="15.247" y1="13.539"
                                        y2="5.069" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#bb45ea" />
                                        <stop offset="1" stop-color="#9c6cfe" />
                                    </linearGradient>
                                    <linearGradient id="fluentColorDocumentFolder161" x1="13" x2="11" y1="6.769"
                                        y2="6.769" gradientUnits="userSpaceOnUse">
                                        <stop offset=".338" stop-color="#5750e2" stop-opacity="0" />
                                        <stop offset="1" stop-color="#5750e2" />
                                    </linearGradient>
                                    <linearGradient id="fluentColorDocumentFolder162" x1="4.571" x2="4.571" y1="5"
                                        y2="17.273" gradientUnits="userSpaceOnUse">
                                        <stop offset=".241" stop-color="#ffd638" />
                                        <stop offset=".637" stop-color="#fab500" />
                                        <stop offset=".985" stop-color="#ca6407" />
                                    </linearGradient>
                                    <radialGradient id="fluentColorDocumentFolder163" cx="0" cy="0" r="1"
                                        gradientTransform="matrix(5.2 -7.66667 11.90405 8.07405 5.4 10)"
                                        gradientUnits="userSpaceOnUse">
                                        <stop offset=".228" stop-color="#2764e7" />
                                        <stop offset=".685" stop-color="#5cd1ff" />
                                        <stop offset="1" stop-color="#6ce0ff" />
                                    </radialGradient>
                                </defs>
                            </g>
                        </svg>
                    </span>
                    <span class="delete" @click="isDel = !isDel">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <g fill="none">
                                <path fill="url(#fluentColorDismissCircle160)" d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2" />
                                <path fill="url(#fluentColorDismissCircle161)"
                                    d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z" />
                                <defs>
                                    <linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13" y1="2.75"
                                        y2="16" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#f83f54" />
                                        <stop offset="1" stop-color="#ca2134" />
                                    </linearGradient>
                                    <linearGradient id="fluentColorDismissCircle161" x1="6.011" x2="8.354" y1="8.199"
                                        y2="10.635" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fdfdfd" />
                                        <stop offset="1" stop-color="#fecbe6" />
                                    </linearGradient>
                                </defs>
                            </g>
                        </svg>
                    </span>
                    <span @click="noteAdd" class="add">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <g fill="none">
                                <path fill="url(#fluentColorAddCircle160)" d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8" />
                                <path fill="url(#fluentColorAddCircle161)"
                                    d="M8 5a.5.5 0 0 0-.5.5v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2v-2A.5.5 0 0 0 8 5" />
                                <defs>
                                    <linearGradient id="fluentColorAddCircle160" x1="2.429" x2="10.71" y1="4.25"
                                        y2="12.854" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#52d17c" />
                                        <stop offset="1" stop-color="#22918b" />
                                    </linearGradient>
                                    <linearGradient id="fluentColorAddCircle161" x1="6.125" x2="7.966" y1="5.612"
                                        y2="12.111" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fff" />
                                        <stop offset="1" stop-color="#e3ffd9" />
                                    </linearGradient>
                                </defs>
                            </g>
                        </svg>
                    </span>
                </div>
                <ul ref="notesListRef">
                    <li @click="selectNote(item)" v-for="(item, index) in noteItems"
                        :class="{ 'active': item.id == activeNotes }" :key="item">
                        <span>{{ item.title }}</span>
                        <span v-if="isDel" @click.stop="delNoteClick(item)" class="del-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <g fill="none">
                                    <path fill="url(#fluentColorDismissCircle160)"
                                        d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2" />
                                    <path fill="url(#fluentColorDismissCircle161)"
                                        d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z" />
                                    <defs>
                                        <linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13" y1="2.75"
                                            y2="16" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#f83f54" />
                                            <stop offset="1" stop-color="#ca2134" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorDismissCircle161" x1="6.011" x2="8.354"
                                            y1="8.199" y2="10.635" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fdfdfd" />
                                            <stop offset="1" stop-color="#fecbe6" />
                                        </linearGradient>
                                    </defs>
                                </g>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="right" v-if="(!isMobile || (isMobile && isShowNotes)) && activeNotes">
                <span class="back" @click="backList" v-if="isMobile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#2f88ff" fill-rule="evenodd" stroke="#000" stroke-linejoin="round" stroke-width="4"
                            d="M44 40.8361C39.1069 34.8632 34.7617 31.4739 30.9644 30.6682C27.1671 29.8625 23.5517 29.7408 20.1182 30.303V41L4 23.5453L20.1182 7V17.167C26.4667 17.2172 31.8638 19.4948 36.3095 24C40.7553 28.5052 43.3187 34.1172 44 40.8361Z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
                <input @input="onInput" maxlength="30" @blur="editNote(isLogin, noteDetails)"
                    v-model="noteDetails.title" class="title" type="text" placeholder="标题" />
                <textarea @input="onInput" @blur="editNote(isLogin, noteDetails)" v-model="noteDetails.data"
                    class="content" placeholder="笔记"></textarea>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import Sortable from "sortablejs";
import { watch, onMounted, onBeforeUnmount, reactive, ref, computed, inject, nextTick, effect, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
const router = useRouter();

const isShow = ref(true)
// 设置弹窗关闭
function closeDialog() {
    isShow.value = false
    // 跳转到首页
    router.push('/');
}

// 获取屏幕尺寸 低于500式 为移动端
const isMobile = ref(false)
const isShowNotes = ref(false)
const screenWidth = ref(document.documentElement.clientWidth)
if (screenWidth.value < 768) {
    isMobile.value = true
}

// 获取用户信息 是否登陆
import { useUserStore } from '@/stores/useAuthStore'
let { isLogin } = storeToRefs(useUserStore());
// 加载Notes
import { useNotesStore } from "@/stores/useNotesStore"
let { loadNotes, editNote, delNote, addNote, updateNoteSort } = useNotesStore();
let { noteItems, activeNotes, noteDetails } = storeToRefs(useNotesStore());
watch(isLogin, () => {
    loadNotes(isLogin.value)
})

const isLoad = ref(false);
watchEffect(() => {
    if (isLoad.value) return
    if (isMobile.value && activeNotes.value && noteItems.value.length) {
        isShowNotes.value = true
        isLoad.value = true
    }
})

// app 返回列表
function backList() {
    isShowNotes.value = false
    activeNotes.value = ''
    localStorage.setItem("activeNotes", '');
    noteDetails.value = {};
}
// 选择笔记
function selectNote(data) {
    activeNotes.value = data.id;
    localStorage.setItem("activeNotes", data.id);
    noteDetails.value = data;
    isShowNotes.value = true
}
// 更新保存笔记
let timer;
function onInput() {
    clearTimeout(timer);
    const copyParams = JSON.parse(JSON.stringify(noteDetails.value));
    timer = setTimeout(function () {
        editNote(isLogin.value, copyParams)
    }, 2000);
}
// 新增笔记
function noteAdd() {
    const data = {
        title: "新建笔记",
        data: "新建笔记内容",
    };
    addNote(isLogin.value, data);
}
// 删除
let isDel = ref(false);
function delNoteClick(params) {
    delNote(isLogin.value, params);
}

// 笔记排序
const notesListRef = ref(null);
onMounted(() => {
    nextTick(() => {
        // 移动端不排序
        if (isMobile.value && !notesListRef.value) return
        Sortable.create(notesListRef.value, {
            group: "shared",
            animation: 150,
            ghostClass: "ghost",
            onEnd: ({ newIndex, oldIndex }) => {
                const item = noteItems.value.splice(oldIndex, 1)[0];
                noteItems.value.splice(newIndex, 0, item);
                updateNoteSort(isLogin.value, noteItems.value)
            },
        });
    })
})
</script>

<style lang="less" scoped>
.notes-main::-webkit-scrollbar,
.right::-webkit-scrollbar,
.left::-webkit-scrollbar,
.content::-webkit-scrollbar,
ul::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.notes-main::-webkit-scrollbar-thumb,
.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb,
.content::-webkit-scrollbar-thumb,
ul::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.notes-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    color: var(--fontColor);
    overflow: hidden;

    .left {
        width: 300px;
        border-radius: 6px;
        margin-right: 12px;
        overflow: hidden;
        height: 100%;

        .title {
            margin: 0 12px 0 6px;
            padding: 0 56px 0;
            position: relative;
            line-height: 36px;
            border-radius: 6px;
            border: 1px solid #ccc;

            .title-text {
                font-weight: bold;
            }

            .add,
            .delete,
            .edit {
                display: block;
                position: absolute;
                right: 6px;
                cursor: pointer;
                top: 4px;
                width: 24px;
                height: 24px;
                font-size: 24px;
            }

            .edit {
                left: 4px;
                width: 32px;
                height: 32px;
                top: 2px;

            }

            .delete {
                right: 32px;
            }
        }


        ul {
            padding-left: 0;
            list-style: none;
            height: calc(100% - 35px);
            overflow: auto;
            margin: 6px 0 12px 0;

            li {
                cursor: pointer;
                position: relative;
                width: 285px;
                height: 42px;
                line-height: 42px;
                border-radius: 6px;
                padding: 0 12px;
                background: var(--notesBg);
                box-shadow: var(--notesShadow);
                border: var(--border);
                color: var(--fontColor);
                margin: 12px 5px;
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
        }

        .del-btn {
            cursor: pointer;
            display: block;
            position: absolute;
            right: 8px;
            top: 8px;
            width: 24px;
            height: 24px;
            text-align: center;
        }
    }

    .right {
        flex: 1;
        border-radius: 6px;
        overflow: hidden;
        position: relative;

        .back {
            position: absolute;
            width: 26px;
            height: 26px;
            right: 12px;
            top: 12px;
            cursor: pointer;
        }

        .title {
            font-size: 18px;
            width: 100%;
            height: 52px;
            line-height: 52px;
            outline: none;
            border: none;
            padding: 0 12px;
            background: var(--notesBg);
            border-bottom: 1px solid #ccc;
            color: var(--fontColor);
        }

        .content {
            outline: none;
            border: none;
            padding-left: 12px;
            line-height: 32px;
            background: var(--notesBg);
            width: 100%;
            min-height: calc(100% - 52px);
            padding: 12px;
            font-size: 18px;
            resize: none;
            overflow: auto;
            color: var(--fontColor);
            padding-top: 30px;
        }
    }
}

// 媒体查询
@media screen and (max-width: 768px) {
    .notes-main .left {
        margin: 0 auto;
    }
}
</style>
