import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, reactive, watchEffect, type Ref, watch } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
// 定义导航项的类型
interface NoteItem {
    id?: number;
    title: string;
    data: string;
    sort_order?: number;
}

export const useNotesStore = defineStore("notes", () => {
    // 定义导航数组
    const noteItems = ref<NoteItem[]>([]);
    const activeNotes = ref(localStorage.getItem("activeNotes") || "");
    const noteDetails = ref({});

    onMounted(() => {
        let isLogin = localStorage.getItem("token") ? true : false;
        loadNotes(isLogin);
    });
    watch(activeNotes, () => {
        localStorage.setItem("activeNotes", activeNotes.value);
    });

    const loadNotes = (isLogin: boolean) => {
        if (isLogin) {
            // 加载已登陆用户的导航菜单
            api.get("note")
                .then((res) => {
                    if (res.code === 200) {
                        if (res.data.length === 0) {
                            // 接口获取用户笔记为空时，默认批量上传本地notesList。
                            const notesList = JSON.parse(localStorage.getItem("notesList") || "[]");
                            noteItems.value = notesList;
                            if (!notesList.length) {
                                activeNotes.value = '';
                                noteDetails.value = {};
                                return;
                            }
                            api.post("note/batch", { notesList })
                                .then((res) => {
                                    if (res.code === 200) {
                                        loadNotes(isLogin);
                                        ElMessage.success("笔记同步成功");
                                    }
                                })
                                .catch(() => {
                                    ElMessage.error("笔记同步失败");
                                });
                        } else {
                            noteItems.value = res.data;
                            // 判断是否有激活的笔记
                            if (activeNotes.value) {
                                let note = noteItems.value.find((it) => it.id === parseInt(activeNotes.value));
                                if (note) {
                                    noteDetails.value = note;
                                } else if (noteItems.value.length) {
                                    activeNotes.value = noteItems.value[0].id + '';
                                    noteDetails.value = noteItems.value[0];
                                } else {
                                    activeNotes.value = '';
                                    noteDetails.value = {};
                                }
                            } else {
                                activeNotes.value = noteItems.value[0].id + '';
                                noteDetails.value = noteItems.value[0];
                            }
                            localStorage.setItem("notesList", JSON.stringify(res.data));
                        }
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            // 未登陆用户
            const notesList = localStorage.getItem("notesList");
            if (notesList && notesList !== "[]") {
                noteItems.value = JSON.parse(notesList);
                // 判断是否有激活的笔记
                if (activeNotes.value) {
                    noteDetails.value = noteItems.value.find((it) => it.id === parseInt(activeNotes.value)) || {};
                } else {
                    activeNotes.value = noteItems.value[0].id + '';
                    noteDetails.value = noteItems.value[0];
                }
            } else {
                noteItems.value = [];
                // 默认新建一个笔记 并且选择激活
                const noteItem: NoteItem = {
                    id: new Date().getTime(),
                    title: "笔记模块",
                    data: "在这里可以记录你的笔记"
                };
                addNote(isLogin, noteItem);
                activeNotes.value = noteItem.id + '';
                noteDetails.value = noteItem;
            }
        }
    };

    const editNote = (isLogin: boolean, params: NoteItem) => {
        if (isLogin) {
            // 查看列表是否有该笔记
            const index = noteItems.value.findIndex((item) => item.id === params.id);
            if (index == -1) return
            api.post("note/update", params)
                .then((res) => {
                    if (res.code !== 200) {
                        ElMessage.error(res.message);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            const index = noteItems.value.findIndex((item) => item.id === params.id);
            if (index !== -1) {
                noteItems.value[index] = params;
                localStorage.setItem("notesList", JSON.stringify(noteItems.value));
            }
        }
    };

    const delNote = (isLogin: boolean, params: NoteItem) => {
        noteItems.value = noteItems.value.filter((item) => item.id !== params.id);
        localStorage.setItem("notesList", JSON.stringify(noteItems.value));
        if (isLogin) {
            api.post("note/delete", { id: params.id })
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("删除成功");
                        loadNotes(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        }
    };

    const addNote = (isLogin: boolean, params: NoteItem) => {
        if (isLogin) {
            api.post("note/add", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("添加成功");
                        loadNotes(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                })
        } else {
            noteItems.value.unshift(params);
            localStorage.setItem("notesList", JSON.stringify(noteItems.value));
        }
    }


    const updateNoteSort = (isLogin: boolean, params: NoteItem[]) => {
        if (isLogin) {
            // 重新排序
            const params = noteItems.value.map((item, index) => {
                return {
                    id: item.id,
                    sort_order: index,
                };
            });
            api.post("note/sort", params)
                .then((res) => {
                    if (res.code === 200) {
                        loadNotes(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            noteItems.value = params;
            localStorage.setItem("notesList", JSON.stringify(noteItems.value));
        }
    };

    return {
        noteItems,
        activeNotes,
        noteDetails,
        loadNotes,
        editNote,
        delNote,
        addNote,
        updateNoteSort
    };
});
