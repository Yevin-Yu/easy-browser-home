<template>
    <el-dialog :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }" v-model="isShow"
        :close-on-click-modal="false" :modal="false" top="50px" title="待办" width="calc(100% - 160px)"
        :before-close="closeDialog">

        <div class="main">
            <!-- 添加代办 -->
            <div class="add-todo">

                <el-input class="todo-input" size="large" v-model="todoTitle" placeholder="请输入待办事项"></el-input>
                <el-date-picker size="large" class="todo-time" :clearable="false" :editable="false" v-model="todoTime"
                    type="date" placeholder="代办时间">
                </el-date-picker>
                <button class="button-default" @click="addTodoClick">添加</button>
                <button class="button-default" @click="isEdit = !isEdit">删除</button>

            </div>
            <div class="todo-list">
                <!-- 待办 -->
                <div class="left-todo">
                    <div class="title">
                        <span class="edit">
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
                        <li v-for="(item, index) in todoToday" :key="item.id">
                            <!-- 是否完成 -->
                            <span class="checkbox" :class="{ 'checked': item.checked }"
                                @click.stop="changeTodoStatus(item)">
                                <!-- -->
                                <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorApprovalsApp160)" fill-rule="evenodd"
                                            d="M8.571.236a.806.806 0 0 0-1.14 1.14l.73.728H8a6.448 6.448 0 1 0 6.449 6.448a.806.806 0 1 0-1.612 0a4.837 4.837 0 1 1-4.836-4.837h.248l-.818.818a.806.806 0 1 0 1.14 1.14l2.148-2.149a.806.806 0 0 0 0-1.14z"
                                            clip-rule="evenodd" />
                                        <path fill="url(#fluentColorApprovalsApp161)" fill-rule="evenodd"
                                            d="M11.61 5.812a.806.806 0 0 1 0 1.14l-3.472 3.471a.806.806 0 0 1-1.14 0L5.696 9.121a.806.806 0 1 1 1.14-1.14l.732.733l2.902-2.902a.806.806 0 0 1 1.14 0"
                                            clip-rule="evenodd" />
                                        <defs>
                                            <linearGradient id="fluentColorApprovalsApp160" x1="1.554" x2="5.941"
                                                y1="1.231" y2="17.422" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorApprovalsApp161" x1="10.891" x2="4.999"
                                                y1="6.555" y2="9.484" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#42b870" />
                                                <stop offset="1" stop-color="#309c61" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorHistory160)"
                                            d="M7.698 5a.75.75 0 0 1 .75.75V7.5h1.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75" />
                                        <path fill="url(#fluentColorHistory161)"
                                            d="M7.947 3.5a4.5 4.5 0 1 1-4.454 5.14a.75.75 0 1 0-1.485.212a6.001 6.001 0 1 0 1.94-5.324V2.75a.75.75 0 1 0-1.5 0v3c0 .414.335.75.75.75h2.5a.75.75 0 1 0 0-1.5H4.592a4.5 4.5 0 0 1 3.354-1.5" />
                                        <defs>
                                            <linearGradient id="fluentColorHistory160" x1="6.357" x2="14.586"
                                                y1="12.633" y2="8.988" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#d373fc" />
                                                <stop offset="1" stop-color="#6d37cd" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorHistory161" x1="2" x2="5.234" y1="2.706"
                                                y2="16.186" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>

                            </span>
                            <!-- 待办标题 -->
                            <div class="todo-title">
                                <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                                    v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                                <div v-else class="todo-text">{{ item.title }}</div>
                            </div>
                            <!-- 时间选择 -->
                            <div class="todo-time">
                                <span>时间：</span>
                                <el-date-picker @change="changeTodoTitle(item, $event)" size="small" class="todo-time"
                                    :disabled="item.checked ? true : false" :clearable="false" :editable="false"
                                    v-model="item.time" type="date" placeholder="时间">
                                </el-date-picker>
                            </div>
                            <!-- 备注输入 -->
                            <div class="todo-remark">
                                <span>备注：</span>
                                <el-input type="textarea" @input="changeTodoTitle(item, $event)"
                                    :autosize="{ minRows: 2, maxRows: 6 }" rows="3"
                                    :disabled="item.checked ? true : false" resize="none" placeholder="可输入备注"
                                    v-model="item.remark">
                                </el-input>
                            </div>

                            <span class="del-btn" v-if="isEdit" @click="delTodoClick(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorDismissCircle160)"
                                            d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2" />
                                        <path fill="url(#fluentColorDismissCircle161)"
                                            d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z" />
                                        <defs>
                                            <linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13"
                                                y1="2.75" y2="16" gradientUnits="userSpaceOnUse">
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
                        <li v-for="(item, index) in todoUnfinished" :key="item.id">
                            <!-- 是否完成 -->
                            <span class="checkbox" :class="{ 'checked': item.checked }"
                                @click.stop="changeTodoStatus(item)">
                                <!-- -->
                                <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorApprovalsApp160)" fill-rule="evenodd"
                                            d="M8.571.236a.806.806 0 0 0-1.14 1.14l.73.728H8a6.448 6.448 0 1 0 6.449 6.448a.806.806 0 1 0-1.612 0a4.837 4.837 0 1 1-4.836-4.837h.248l-.818.818a.806.806 0 1 0 1.14 1.14l2.148-2.149a.806.806 0 0 0 0-1.14z"
                                            clip-rule="evenodd" />
                                        <path fill="url(#fluentColorApprovalsApp161)" fill-rule="evenodd"
                                            d="M11.61 5.812a.806.806 0 0 1 0 1.14l-3.472 3.471a.806.806 0 0 1-1.14 0L5.696 9.121a.806.806 0 1 1 1.14-1.14l.732.733l2.902-2.902a.806.806 0 0 1 1.14 0"
                                            clip-rule="evenodd" />
                                        <defs>
                                            <linearGradient id="fluentColorApprovalsApp160" x1="1.554" x2="5.941"
                                                y1="1.231" y2="17.422" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorApprovalsApp161" x1="10.891" x2="4.999"
                                                y1="6.555" y2="9.484" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#42b870" />
                                                <stop offset="1" stop-color="#309c61" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorHistory160)"
                                            d="M7.698 5a.75.75 0 0 1 .75.75V7.5h1.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75" />
                                        <path fill="url(#fluentColorHistory161)"
                                            d="M7.947 3.5a4.5 4.5 0 1 1-4.454 5.14a.75.75 0 1 0-1.485.212a6.001 6.001 0 1 0 1.94-5.324V2.75a.75.75 0 1 0-1.5 0v3c0 .414.335.75.75.75h2.5a.75.75 0 1 0 0-1.5H4.592a4.5 4.5 0 0 1 3.354-1.5" />
                                        <defs>
                                            <linearGradient id="fluentColorHistory160" x1="6.357" x2="14.586"
                                                y1="12.633" y2="8.988" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#d373fc" />
                                                <stop offset="1" stop-color="#6d37cd" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorHistory161" x1="2" x2="5.234" y1="2.706"
                                                y2="16.186" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>

                            </span>
                            <!-- 待办标题 -->
                            <div class="todo-title">
                                <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                                    v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                                <div v-else class="todo-text">{{ item.title }}</div>
                            </div>
                            <!-- 时间选择 -->
                            <div class="todo-time">
                                <span>时间：</span>
                                <el-date-picker @change="changeTodoTitle(item, $event)" size="small" class="todo-time"
                                    :disabled="item.checked ? true : false" :clearable="false" :editable="false"
                                    v-model="item.time" type="date" placeholder="时间">
                                </el-date-picker>
                                <!-- 已超时 -->
                                <span class="over-time"
                                    v-if="formatDate(new Date(), 'YYYY-MM-DD') > formatDate(item.time, 'YYYY-MM-DD')">
                                    <el-check-tag size="small" :checked="true" type="warning">已超时</el-check-tag>
                                </span>
                            </div>
                            <!-- 备注输入 -->
                            <div class="todo-remark">
                                <span>备注：</span>
                                <el-input type="textarea" @input="changeTodoTitle(item, $event)"
                                    :autosize="{ minRows: 2, maxRows: 6 }" rows="3"
                                    :disabled="item.checked ? true : false" resize="none" placeholder="可输入备注"
                                    v-model="item.remark">
                                </el-input>
                            </div>
                            <span class="del-btn" v-if="isEdit" @click="delTodoClick(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorDismissCircle160)"
                                            d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2" />
                                        <path fill="url(#fluentColorDismissCircle161)"
                                            d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z" />
                                        <defs>
                                            <linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13"
                                                y1="2.75" y2="16" gradientUnits="userSpaceOnUse">
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
                        <li v-for="(item, index) in todoFinished" :key="item.id">
                            <!-- 是否完成 -->
                            <span class="checkbox" :class="{ 'checked': item.checked }"
                                @click.stop="changeTodoStatus(item)">
                                <!-- -->
                                <svg v-if="item.checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorApprovalsApp160)" fill-rule="evenodd"
                                            d="M8.571.236a.806.806 0 0 0-1.14 1.14l.73.728H8a6.448 6.448 0 1 0 6.449 6.448a.806.806 0 1 0-1.612 0a4.837 4.837 0 1 1-4.836-4.837h.248l-.818.818a.806.806 0 1 0 1.14 1.14l2.148-2.149a.806.806 0 0 0 0-1.14z"
                                            clip-rule="evenodd" />
                                        <path fill="url(#fluentColorApprovalsApp161)" fill-rule="evenodd"
                                            d="M11.61 5.812a.806.806 0 0 1 0 1.14l-3.472 3.471a.806.806 0 0 1-1.14 0L5.696 9.121a.806.806 0 1 1 1.14-1.14l.732.733l2.902-2.902a.806.806 0 0 1 1.14 0"
                                            clip-rule="evenodd" />
                                        <defs>
                                            <linearGradient id="fluentColorApprovalsApp160" x1="1.554" x2="5.941"
                                                y1="1.231" y2="17.422" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorApprovalsApp161" x1="10.891" x2="4.999"
                                                y1="6.555" y2="9.484" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#42b870" />
                                                <stop offset="1" stop-color="#309c61" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorHistory160)"
                                            d="M7.698 5a.75.75 0 0 1 .75.75V7.5h1.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75" />
                                        <path fill="url(#fluentColorHistory161)"
                                            d="M7.947 3.5a4.5 4.5 0 1 1-4.454 5.14a.75.75 0 1 0-1.485.212a6.001 6.001 0 1 0 1.94-5.324V2.75a.75.75 0 1 0-1.5 0v3c0 .414.335.75.75.75h2.5a.75.75 0 1 0 0-1.5H4.592a4.5 4.5 0 0 1 3.354-1.5" />
                                        <defs>
                                            <linearGradient id="fluentColorHistory160" x1="6.357" x2="14.586"
                                                y1="12.633" y2="8.988" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#d373fc" />
                                                <stop offset="1" stop-color="#6d37cd" />
                                            </linearGradient>
                                            <linearGradient id="fluentColorHistory161" x1="2" x2="5.234" y1="2.706"
                                                y2="16.186" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#0fafff" />
                                                <stop offset="1" stop-color="#0067bf" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                </svg>

                            </span>
                            <!-- 待办标题 -->
                            <div class="todo-title">
                                <input class="todo-input" v-if="!item.checked" @input="changeTodoTitle(item, $event)"
                                    v-model="item.title" type="text" @blur="editTodo(isLogin, item)" />
                                <div v-else class="todo-text">{{ item.title }}</div>
                            </div>
                            <!-- 时间选择 -->
                            <div class="todo-time">
                                <span>时间：</span>
                                <el-date-picker @change="changeTodoTitle(item, $event)" size="small" class="todo-time"
                                    :disabled="item.checked ? true : false" :clearable="false" :editable="false"
                                    v-model="item.time" type="date" placeholder="时间">
                                </el-date-picker>
                            </div>
                            <!-- 备注输入 -->
                            <div class="todo-remark">
                                <span>备注：</span>
                                <el-input type="textarea" @input="changeTodoTitle(item, $event)"
                                    :autosize="{ minRows: 2, maxRows: 6 }" rows="3"
                                    :disabled="item.checked ? true : false" resize="none" placeholder="可输入备注"
                                    v-model="item.remark">
                                </el-input>
                            </div>
                            <span class="del-btn" v-if="isEdit" @click="delTodoClick(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path fill="url(#fluentColorDismissCircle160)"
                                            d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2" />
                                        <path fill="url(#fluentColorDismissCircle161)"
                                            d="M5.896 5.896a.5.5 0 0 1 .638-.057l.07.057L8 7.293l1.396-1.397a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L8.707 8l1.397 1.396a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-1.396 1.397a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L7.293 8L5.896 6.604a.5.5 0 0 1-.057-.638z" />
                                        <defs>
                                            <linearGradient id="fluentColorDismissCircle160" x1="3.875" x2="13"
                                                y1="2.75" y2="16" gradientUnits="userSpaceOnUse">
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
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import Sortable from "sortablejs";
// 时间格式化
import { formatDate } from '@/hook/useFormatDate'
import { storeToRefs } from "pinia";
import { ref, onMounted, inject, watch, watchEffect } from "vue";
const isMobile = inject('isMobile');

const todoTitle = ref("");
const todoTime = ref(new Date())

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

// 加载TodoList
import { useTodoStore } from "@/stores/useTodoStore"
let { loadTodos, editTodo, delTodo, addTodo, updateTodoSort } = useTodoStore();
let { todoItems } = storeToRefs(useTodoStore());
watch(isLogin, () => {
    loadTodos(isLogin.value)
})

// 计算 todo 今日待办 未完成 已完成
let todoToday = ref([]);
let todoUnfinished = ref([]);
let todoFinished = ref([]);

watchEffect(() => {
    todoToday.value = todoItems.value.filter(item => item.checked == false && formatDate(item.time, 'YYYY-MM-DD') == formatDate(new Date(), 'YYYY-MM-DD'));
    todoUnfinished.value = todoItems.value.filter(item => item.checked == false);
    // 已完成和未完成根据时间排序
    todoUnfinished.value = todoUnfinished.value.sort((a, b) => new Date(b.time) - new Date(a.time));
    todoFinished.value = todoItems.value.filter(item => item.checked == true);
    todoFinished.value = todoFinished.value.sort((a, b) => new Date(b.time) - new Date(a.time));
})

// 新增Todo
function addTodoClick() {
    let data = {
        id: new Date().getTime(),
        time: formatDate(new Date(todoTime.value), 'YYYY-MM-DD'),
        title: todoTitle.value || "新建Todo",
        checked: false,
        remark: "",
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
function delTodoClick(params) {
    delTodo(isLogin.value, params)
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
            width: 200px;
            margin-right: 16px;
        }

        :deep(.todo-time) {
            width: 200px;
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
                    // height: 150px;
                    border-radius: 12px;
                    padding: 10px 20px 10px 12px;
                    background: var(--notesBg);
                    box-shadow: var(--notesShadowActive);
                    border: var(--border);
                    color: var(--fontColor);
                    margin: 16px 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-right: 12px;
                    text-align: left;
                }

                li.active {
                    box-shadow: var(--notesShadow);
                }

                li:hover,
                li:active {
                    box-shadow: var(--notesShadow);
                }

                .checkbox {
                    margin-right: 12px;
                    display: inline-block;
                    height: 32px;
                    width: 32px;
                    border-radius: 10px;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    background: var(--notesBg);
                    box-shadow: var(--notesShadow);
                    border: var(--border);
                    color: var(--fontColor);

                    svg {
                        position: relative;
                        top: 3px;
                        left: 3px;
                        width: 24px;
                        height: 24px;
                    }
                }

                .checkbox.checked {
                    color: #999;
                }

                .todo-title {
                    line-height: 32px;

                    .todo-input {
                        margin-left: 40px;
                        margin-right: 12px;
                        outline: none;
                        border: none;
                        height: 28px;
                        background: transparent;
                        border: var(--border);
                        color: var(--fontColor);
                        padding: 0;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: calc(100% - 36px);
                    }

                    .todo-text {
                        margin-left: 40px;
                        font-size: 14px;
                        text-decoration: line-through;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: calc(100% - 36px);
                        color: #999;
                    }
                }

                .todo-time {
                    margin: 6px 0;
                    line-height: 42px;
                    color: var(--fontColorLabel);
                    font-size: 12px;

                    :deep(.el-input) {
                        width: 120px;
                        font-size: 12px;
                    }

                    .over-time {
                        padding: 0 6px;

                        .el-check-tag {
                            position: relative;
                            top: 1px;
                            font-size: 12px;
                            padding: 4px 15px;
                        }

                        svg {

                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                        }
                    }
                }

                .todo-remark {
                    margin: 6px 0;
                    width: 100%;
                    font-size: 12px;
                    color: var(--fontColorLabel);

                    span {
                        vertical-align: top;
                    }

                    .el-textarea {
                        width: calc(100% - 42px);
                        font-size: 12px;
                    }
                }

                .checkbox:hover,
                .checkbox:active {
                    box-shadow: var(--notesShadowActive);
                }
            }
        }


        .del-btn {
            position: absolute;
            right: 6px;
            top: 12px;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        .del-btn:hover,
        .del-btn:active {
            box-shadow: var(--notesShadowActive);
        }

    }
}

// 媒体查询
@media screen and (max-width: 768px) {
    .main {
        .add-todo {
            height: 110px;
        }

        .todo-list {
            height: calc(100% - 120px);
        }
    }
}
</style>
