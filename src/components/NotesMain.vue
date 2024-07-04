<template>
    <div class="notes-main">
        <div class="left">
            <div class="title">
                <span class="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path
                            fill="currentColor"
                            d="m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336zm384 254.272v-64h448v64h-448z"></path>
                    </svg>
                </span>
                笔记列表
                <span @click="noteAdd" class="add">+</span>
            </div>
            <ul>
                <li @click="selectNote(item)" v-for="item in store.notesList" :class="{'active':item.id == store.activeNotes}" :key="item">{{item.title}}</li>
            </ul>
        </div>
        <div class="right">
            <input maxlength="30" v-model="noteDetails.title" class="title" type="text" placeholder="标题" /><br />
            <textarea v-model="noteDetails.data" class="content" placeholder="笔记"></textarea>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, onBeforeUnmount, reactive } from "vue";
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
    }
});
function noteAdd() {
    const data = {
        id: new Date().getTime(),
        title: "新建笔记",
        data: "",
    };
    store.notesList.push(data);
    localStorage.setItem("notesList", JSON.stringify(store.notesList));
}
function selectNote(data) {
    store.activeNotes = data.id;
    localStorage.setItem("activeNotes", data.id);
    noteDetails = data;
}
onBeforeUnmount(() => {
    localStorage.setItem("notesList", JSON.stringify(store.notesList));
});
</script>
  
<style lang="less" scoped>
.notes-main::-webkit-scrollbar,
.right::-webkit-scrollbar,
.left::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.notes-main::-webkit-scrollbar-thumb,
.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
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
    }
    .left {
        width: 320px;
        border-radius: 6px;
        margin-right: 12px;
        overflow: auto;
        height: calc(55vh - 32px);
        ul {
            padding-left: 0;
            list-style: none;
            li {
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
        overflow: height;
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
        }
    }
}
</style>