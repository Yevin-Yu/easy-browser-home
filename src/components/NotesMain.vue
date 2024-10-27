<template>
    <div class="notes-main-content">

        <div class="notes-main">
            <div class="left" v-show="!isShowNote">
                <div class="title">
                    <span class="edit" @click="isDel = !isDel">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path fill="currentColor"
                                d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z">
                            </path>
                        </svg>
                    </span>
                    笔记列表
                    <span @click="noteAdd" class="add">+</span>
                </div>
                <ul ref="notesListRef">
                    <li @click="selectNote(item)" v-for="(item, index) in store.notesList"
                        :class="{ 'active': item.id == store.activeNotes }" :key="item">
                        <span>{{ item.title }}</span>
                        <span v-if="isDel" @click.stop="delNote(index)" class="del-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                <path fill="currentColor"
                                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
                                </path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="right" v-if="store.activeNotes && true">
                <div class="tools">
                    <svg @click="fontBold" t="1722237098445" fill="#6CB9B4" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4638" width="20" height="32">
                        <path
                            d="M768.96 575.072c-22.144-34.112-54.816-56.8-97.984-68.032v-2.176c22.88-10.88 42.112-23.04 57.696-36.48 15.616-12.704 27.584-26.144 35.936-40.288 16.32-29.76 24.128-60.96 23.392-93.632 0-63.872-19.776-115.232-59.328-154.08-39.2-38.464-97.824-58.048-175.84-58.784H215.232v793.728H579.52c62.432 0 114.496-20.864 156.256-62.624 42.112-39.936 63.52-94.176 64.224-162.752 0-41.376-10.336-79.68-31.04-114.88zM344.32 228.832h194.912c43.904 0.736 76.224 11.424 96.896 32.128 21.056 22.144 31.584 49.184 31.584 81.12s-10.528 58.432-31.584 79.488c-20.672 22.848-52.992 34.304-96.896 34.304H344.32V228.832z m304.352 536.256c-20.672 23.584-53.344 35.744-97.984 36.48H344.32v-238.432h206.336c44.64 0.704 77.312 12.512 97.984 35.392 20.672 23.232 31.04 51.168 31.04 83.84 0 31.904-10.336 59.488-31.008 82.72z"
                            p-id="4639"></path>
                    </svg>
                    <svg t="1722237109755" fill="#6CB9B4" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4800" width="20" height="32">
                        <path
                            d="M792.864 922.112l103.584-2.176L572.576 110.24h-89.184L161.696 919.936H264l66.944-167.936h394.112l67.808 170.112zM369.216 656L528 257.632 686.784 656h-317.568z"
                            p-id="4801"></path>
                    </svg>
                    <div class="font-size-list">
                        <ul>
                            <li @click="editFontSize(item)" v-for="item in fonstStore.size" :key="item">{{ item }}</li>
                        </ul>
                    </div>
                </div>
                <input @input="onInput" maxlength="30" v-model="noteDetails.title" class="title" type="text"
                    placeholder="标题" /><br />
                <textarea :style="textStyle" @input="onInput" v-model="noteDetails.data" class="content"
                    placeholder="笔记"></textarea>
                <div class="back-btn" @click="isShowNote = false" v-if="isMobile && isShowNote">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M118.656 438.656a32 32 0 0 1 0-45.248L416 96l4.48-3.776A32 32 0 0 1 461.248 96l3.712 4.48a32.064 32.064 0 0 1-3.712 40.832L218.56 384H928a32 32 0 1 1 0 64H141.248a32 32 0 0 1-22.592-9.344zM64 608a32 32 0 0 1 32-32h786.752a32 32 0 0 1 22.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 0 1-40.832-49.024L805.632 640H96a32 32 0 0 1-32-32">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { onMounted, onBeforeUnmount, reactive, ref, computed, inject } from "vue";
const isMobile = inject('isMobile');
const isShowNote = ref(false);
// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();
let noteDetails = reactive({});
onMounted(() => {
    const notesList = JSON.parse(localStorage.getItem("notesList"));
    if (notesList) store.notesListChange(notesList);
    const activeNotes = localStorage.getItem("activeNotes");
    if (activeNotes) store.activeNotesChange(activeNotes);
    if (notesList && activeNotes) {
        noteDetails = notesList.find((it) => it.id == activeNotes);
        if (!noteDetails && store.notesList.length) {
            noteDetails = store.notesList[0];
            store.activeNotesChange(noteDetails.id);
        }
    }
    if (isMobile) {
        store.activeNotesChange('')
    }
    // 排序
    const notesSortable = Sortable.create(notesListRef.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = store.notesList.splice(oldIndex, 1)[0];
            store.notesList.splice(newIndex, 0, item);
            localStorage.setItem("notesList", JSON.stringify(store.notesList));
        },
    });
});
function noteAdd() {
    const data = {
        id: new Date().getTime(),
        title: "新建笔记",
        data: "",
    };
    store.notesList.unshift(data);
    selectNote(data);
    localStorage.setItem("notesList", JSON.stringify(store.notesList));
}
function selectNote(data) {
    store.activeNotes = data.id;
    localStorage.setItem("activeNotes", data.id);
    noteDetails = data;
    isShowNote.value = true;
}
onBeforeUnmount(() => {
    localStorage.setItem("notesList", JSON.stringify(store.notesList));
});
// 保存优化 2秒内没输入自动保存
let timer;
function onInput() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        localStorage.setItem("notesList", JSON.stringify(store.notesList));
    }, 2000);
}
// 删除
let isDel = ref(false);
function delNote(index) {
    store.notesList.splice(index, 1);
    localStorage.setItem("notesList", JSON.stringify(store.notesList));
    if (store.notesList && store.activeNotes) {
        noteDetails = store.notesList.find((it) => it.id == store.activeNotes);
        if (!noteDetails && store.notesList.length) {
            noteDetails = store.notesList[0];
            store.activeNotesChange(noteDetails.id);
        } else {
            noteDetails = {};
            store.activeNotesChange(null);
        }
    }
}
// 排序
const notesListRef = ref(null);
// 字体 放大缩小  加粗
import { useFontStore } from "@/stores/fontStore";
let fonstStore = useFontStore();
const textStyle = computed(() => {
    return {
        fontSize: fonstStore.fontSize + "px",
        fontWeight: fonstStore.fontBold,
    }
})
const fontBold = () => {
    if (fonstStore.fontBold === 'normal') fonstStore.fontBold = 'bold'
    else {
        fonstStore.fontBold = 'normal'
    }
}
const fontLager = () => {
    const index = fonstStore.size.indexOf(fonstStore.fontSize)
    if (index !== -1) {
        console.log(index)
        if (index !== fonstStore.size.length - 1) { fonstStore.fontSize = fonstStore.size[index + 1] }
        else {
            fonstStore.fontSize = fonstStore.size[0]
        }
    }
}
const editFontSize = (data) => {
    fonstStore.fontSize = data
}
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
    width: 75vw;
    height: 55vh;
    margin: 7.5vh auto;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-radius: 15px;
    background: var(--bgColorDefaut);
    box-shadow: var(--shadow);
    border: var(--border);
    color: var(--fontColor);
    padding: 16px;
    overflow: hidden;

    .title {
        padding: 0 56px 0;
        position: relative;
        line-height: 32px;

        .add {
            display: block;
            position: absolute;
            right: 20px;
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

    .left {
        width: 320px;
        border-radius: 6px;
        margin-right: 12px;
        overflow: hidden;
        height: calc(55vh - 32px);

        ul {
            padding-left: 0;
            list-style: none;
            height: calc(100% - 30px);
            overflow: auto;
            margin-top: 6px;

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
        }
    }

    .right {
        flex: 1;
        border-radius: 6px;
        overflow: hidden;
        position: relative;

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

        .tools {
            position: absolute;
            top: 55px;
            right: 12px;
            z-index: 1;
            line-height: 32px;
            height: 32px;
            padding: 0 12px;
            background: var(--notesBg);
            box-shadow: var(--notesShadow);
            box-shadow: 3px 3px 3px #6cb9b480;
            border: var(--border);
            color: var(--fontColor);
            border-radius: 4px;

            svg {
                cursor: pointer;
                margin: 0 4px;
                color: var(--fontColor);
            }

            .font-size-list {
                position: absolute;
                right: -6px;
                top: 32px;
                display: none;
                background: var(--notesBg);
                box-shadow: var(--notesShadow);
                box-shadow: 3px 3px 3px #6cb9b480;
                border: var(--border);
                color: var(--fontColor);
                border-radius: 6px;

                ul {
                    list-style: none;
                    padding-left: 0;
                    display: flex;
                    flex-wrap: wrap;
                    width: 60px;
                    border-radius: 6px;

                    li {
                        text-align: center;
                        width: 30px;
                        padding: 2px 8px;
                        font-size: 14px;
                        line-height: 20px;
                        cursor: pointer;

                        &:hover {
                            color: #6cb9b4;
                        }
                    }
                }
            }

            svg:nth-of-type(2):hover+.font-size-list {
                display: block;
            }

            .font-size-list:hover {
                display: block;
            }
        }
    }
}

.isMobile {
    .notes-main-content {
        width: 90vw;
        height: 55vh;
        margin: 5vh auto;
        padding: 24px;
    }

    .notes-main {
        width: 100%;
        margin: 0 auto;
        display: block;

        .left {
            margin-left: 0;
            width: 100%;

            .title {
                font-size: 20px;
            }

            ul {
                width: 100%;
                padding: 12px;

                li {
                    width: calc(100% - 12px);
                }
            }
        }

        .right {
            height: calc(55vh - 36px);

            .back-btn {
                position: absolute;
                right: 24px;
                top: 16px;
            }
        }
    }
}
</style>
