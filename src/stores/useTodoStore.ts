import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
// 定义导航项的类型
interface TodoItem {
    id?: number;
    title: string;
    checked: boolean | number;
    sort_order?: number;
}

export const useTodoStore = defineStore("todo", () => {
    // 定义导航数组
    const todoItems = ref<TodoItem[]>([]);

    onMounted(() => {
        let isLogin = localStorage.getItem("token") ? true : false;
        loadTodos(isLogin);
    });

    const loadTodos = (isLogin: boolean) => {
        if (isLogin) {
            // 加载已登陆用户的导航菜单
            api.get("todo")
                .then((res) => {
                    if (res.code === 200) {
                        if (res.data.length === 0) {
                            // 接口获取用户待办为空时，默认批量上传本地todosList。
                            const todosList = JSON.parse(localStorage.getItem("todosList") || "[]");
                            todoItems.value = todosList;
                            if (!todosList && !todosList.length) return;
                            api.post("todo/batch", { todosList })
                                .then((res) => {
                                    if (res.code === 200) {
                                        loadTodos(isLogin);
                                        ElMessage.success("待办同步成功");
                                    }
                                })
                                .catch(() => {
                                    ElMessage.error("待办同步失败");
                                });
                        } else {
                            todoItems.value = res.data;
                            // 获取数据 同步到本地
                            localStorage.setItem("todosList", JSON.stringify(res.data));
                        }
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            // 未登陆用户
            const todosList = localStorage.getItem("todosList");
            if (todosList) {
                todoItems.value = JSON.parse(todosList);
            } else {
                todoItems.value = [];
            }
        }
    };

    const editTodo = (isLogin: boolean, params: TodoItem) => {
        if (isLogin) {
            api.post("todo/update", params)
                .then((res) => {
                    if (res.code !== 200) {
                        ElMessage.error(res.message);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            const index = todoItems.value.findIndex((item) => item.id === params.id);
            if (index !== -1) {
                todoItems.value[index] = params;
                localStorage.setItem("todosList", JSON.stringify(todoItems.value));
            }
        }
    };

    const delTodo = (isLogin: boolean, params: TodoItem, index: number) => {
        if (isLogin) {
            api.post("todo/delete", { id: params.id })
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("删除成功");
                        loadTodos(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            todoItems.value.splice(index, 1);
            localStorage.setItem("todosList", JSON.stringify(todoItems.value));
        }
    };

    const addTodo = (isLogin: boolean, params: TodoItem) => {
        if (isLogin) {
            api.post("todo/add", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("添加成功");
                        loadTodos(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                })
        } else {
            todoItems.value.unshift(params);
            localStorage.setItem("todosList", JSON.stringify(todoItems.value));
        }
    }


    const updateTodoSort = (isLogin: boolean, params: TodoItem[]) => {
        if (isLogin) {
            // 重新排序
            const params = todoItems.value.map((item, index) => {
                return {
                    id: item.id,
                    sort_order: index,
                };
            });
            api.post("todo/sort", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("排序成功");
                        loadTodos(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            todoItems.value = params;
            localStorage.setItem("todosList", JSON.stringify(todoItems.value));
        }
    };

    return {
        todoItems,
        loadTodos,
        editTodo,
        delTodo,
        addTodo,
        updateTodoSort
    };
});
