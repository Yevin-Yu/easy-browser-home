<template>
    <el-dialog :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }" v-model="isShow"
        :close-on-click-modal="false" :modal="false" top="50px" title="待办" width="calc(100% - 160px)"
        :before-close="closeDialog">

        <div class="main">
            <!-- 添加代办 -->
            <div class="add-todo">
                <el-input class="todo-input" size="large" v-model="input" placeholder="请输入待办事项"></el-input>
                <el-date-picker size="large" class="todo-time" v-model="value1" type="date" placeholder="代办时间">
                </el-date-picker>
                <button class="button-default">添加</button>
            </div>
            <div class="todo-list">
                <!-- 待办 -->
                <div class="left-todo">
                    <div class="title">
                        <span class="edit" @click="isEdit = !isEdit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <g fill="none">
                                    <path fill="url(#fluentColorCalendarClock160)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarClock161)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarClock165)" fill-opacity="0.3"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarClock162)"
                                        d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5V6h12z" />
                                    <path fill="url(#fluentColorCalendarClock163)"
                                        d="M16 11.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" />
                                    <path fill="url(#fluentColorCalendarClock164)" fill-rule="evenodd"
                                        d="M11.5 9a.5.5 0 0 1 .5.5V11h1a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5"
                                        clip-rule="evenodd" />
                                    <defs>
                                        <linearGradient id="fluentColorCalendarClock160" x1="6.286" x2="9.327" y1="4.5"
                                            y2="13.987" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#b3e0ff" />
                                            <stop offset="1" stop-color="#8cd0ff" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarClock161" x1="9.286" x2="11.025"
                                            y1="8.386" y2="16.154" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#dcf8ff" stop-opacity="0" />
                                            <stop offset="1" stop-color="#ff6ce8" stop-opacity="0.7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarClock162" x1="2.482" x2="4.026" y1="2"
                                            y2="8.725" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#0094f0" />
                                            <stop offset="1" stop-color="#2764e7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarClock163" x1="8.5" x2="13" y1="6.5"
                                            y2="16.5" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#1ec8b0" />
                                            <stop offset="1" stop-color="#2764e7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarClock164" x1="11.219" x2="10.509"
                                            y1="9.459" y2="11.892" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fdfdfd" />
                                            <stop offset="1" stop-color="#d1d1ff" />
                                        </linearGradient>
                                        <radialGradient id="fluentColorCalendarClock165" cx="0" cy="0" r="1"
                                            gradientTransform="matrix(.14285 6.79546 -6.61306 .13902 11.857 12.704)"
                                            gradientUnits="userSpaceOnUse">
                                            <stop offset=".497" stop-color="#4a43cb" />
                                            <stop offset="1" stop-color="#4a43cb" stop-opacity="0" />
                                        </radialGradient>
                                    </defs>
                                </g>
                            </svg>
                        </span>
                        今日待办
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <rect width="16" height="16" fill="none" />
                                <g fill="none">
                                    <path fill="url(#fluentColorCalendar160)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendar161)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <g filter="url(#fluentColorCalendar164)">
                                        <path fill="url(#fluentColorCalendar162)"
                                            d="M5.248 8.997a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497m.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0M8 8.997A.748.748 0 1 0 8 7.5a.748.748 0 0 0 0 1.497m.749 1.752a.748.748 0 1 1-1.497 0a.748.748 0 0 1 1.497 0m2-1.752a.748.748 0 1 0 0-1.497a.748.748 0 0 0 0 1.497" />
                                    </g>
                                    <path fill="url(#fluentColorCalendar163)"
                                        d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5V6h12z" />
                                    <defs>
                                        <linearGradient id="fluentColorCalendar160" x1="10.167" x2="6.667" y1="15.167"
                                            y2="5" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#b3e0ff" />
                                            <stop offset="1" stop-color="#b3e0ff" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendar161" x1="9.286" x2="11.025" y1="8.386"
                                            y2="16.154" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#dcf8ff" stop-opacity="0" />
                                            <stop offset="1" stop-color="#ff6ce8" stop-opacity="0.7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendar162" x1="7.362" x2="8.566" y1="7.039"
                                            y2="15.043" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#0078d4" />
                                            <stop offset="1" stop-color="#0067bf" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendar163" x1="2" x2="12.552" y1="2" y2="-.839"
                                            gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#0094f0" />
                                            <stop offset="1" stop-color="#2764e7" />
                                        </linearGradient>
                                        <filter id="fluentColorCalendar164" width="9.664" height="6.664" x="3.167"
                                            y="6.833" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" result="hardAlpha"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feOffset dy=".667" />
                                            <feGaussianBlur stdDeviation=".667" />
                                            <feColorMatrix
                                                values="0 0 0 0 0.1242 0 0 0 0 0.323337 0 0 0 0 0.7958 0 0 0 0.32 0" />
                                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_378174_9782" />
                                            <feBlend in="SourceGraphic" in2="effect1_dropShadow_378174_9782"
                                                result="shape" />
                                        </filter>
                                    </defs>
                                </g>
                            </svg>
                        </span>
                        未完成
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <rect width="16" height="16" fill="none" />
                                <g fill="none">
                                    <path fill="url(#fluentColorCalendarCheckmark160)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarCheckmark161)"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarCheckmark165)" fill-opacity="0.3"
                                        d="M14 11.5v-6l-6-1l-6 1v6A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5" />
                                    <path fill="url(#fluentColorCalendarCheckmark162)"
                                        d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5V6h12z" />
                                    <path fill="url(#fluentColorCalendarCheckmark163)"
                                        d="M16 11.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" />
                                    <path fill="url(#fluentColorCalendarCheckmark164)" fill-rule="evenodd"
                                        d="M13.854 9.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647l2.646-2.647a.5.5 0 0 1 .708 0"
                                        clip-rule="evenodd" />
                                    <defs>
                                        <linearGradient id="fluentColorCalendarCheckmark160" x1="6.286" x2="9.327"
                                            y1="4.5" y2="13.987" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#b3e0ff" />
                                            <stop offset="1" stop-color="#8cd0ff" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarCheckmark161" x1="9.286" x2="11.025"
                                            y1="8.386" y2="16.154" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#dcf8ff" stop-opacity="0" />
                                            <stop offset="1" stop-color="#ff6ce8" stop-opacity="0.7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarCheckmark162" x1="2.482" x2="4.026"
                                            y1="2" y2="8.725" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#0094f0" />
                                            <stop offset="1" stop-color="#2764e7" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarCheckmark163" x1="7.321" x2="13.533"
                                            y1="8.688" y2="15.141" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#52d17c" />
                                            <stop offset="1" stop-color="#22918b" />
                                        </linearGradient>
                                        <linearGradient id="fluentColorCalendarCheckmark164" x1="9.938" x2="10.946"
                                            y1="9.908" y2="14.36" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#fff" />
                                            <stop offset="1" stop-color="#e3ffd9" />
                                        </linearGradient>
                                        <radialGradient id="fluentColorCalendarCheckmark165" cx="0" cy="0" r="1"
                                            gradientTransform="matrix(.14285 6.79546 -6.61306 .13902 11.857 12.704)"
                                            gradientUnits="userSpaceOnUse">
                                            <stop offset=".497" stop-color="#4a43cb" />
                                            <stop offset="1" stop-color="#4a43cb" stop-opacity="0" />
                                        </radialGradient>
                                    </defs>
                                </g>
                            </svg>
                        </span>
                        已完成
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
    width: 100%;
    height: 100%;

    .add-todo {
        height: 54px;
        line-height: 54px;
        text-align: left;
        padding-left: 12px;

        .todo-input {
            width: 240px;
        }

        ::v-deep .todo-time {
            width: 240px;
            margin-left: 16px;
        }
    }

    .todo-list {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 60px);
        margin-top: 8px;
        overflow: auto;
        padding: 12px;

        .title {
            padding: 0 56px 0;
            position: relative;
            line-height: 32px;
            font-size: 18px;
            color: var(--fontColor);
            font-weight: 600;
            text-align: center;
            text-align: left;

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

            .edit {
                cursor: pointer;
                display: block;
                position: absolute;
                left: 0px;
                top: 0px;
                width: 32px;
                height: 32px;
                text-align: center;
            }
        }

        .left-todo {
            border-radius: 6px;
            flex: 1;
            min-width: 380px;
            height: 100%;
            background: var(--bgColor);
            // box-shadow: var(--newsShadow);
            border: var(--border);
            color: var(--fontColor);
            padding: 16px;
            margin-right: 28px;

            &:last-child {
                margin-right: 0;
            }

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
                    width: 100%;
                    height:150px;
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

    }
}
</style>
