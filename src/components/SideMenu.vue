<template>
    <div class="side-menu">
        <ul>
            <!-- 首页 -->
            <li @click="changeMenu('/')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <g fill="none">
                        <path fill="url(#fluentColorHome160)" d="M6 9h4v5H6z" />
                        <path fill="url(#fluentColorHome161)"
                            d="M8.687 2.273a1 1 0 0 0-1.374 0l-4.844 4.58A1.5 1.5 0 0 0 2 7.943v4.569a1.5 1.5 0 0 0 1.5 1.5h3v-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v4h3a1.5 1.5 0 0 0 1.5-1.5v-4.57a1.5 1.5 0 0 0-.47-1.09z" />
                        <path fill="url(#fluentColorHome162)" fill-rule="evenodd"
                            d="m8.004 2.636l5.731 5.41a.75.75 0 1 0 1.03-1.091L8.86 1.382a1.25 1.25 0 0 0-1.724.007L1.23 7.059a.75.75 0 0 0 1.038 1.082z"
                            clip-rule="evenodd" />
                        <defs>
                            <linearGradient id="fluentColorHome160" x1="8" x2="4.796" y1="9" y2="14.698"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#944600" />
                                <stop offset="1" stop-color="#cd8e02" />
                            </linearGradient>
                            <linearGradient id="fluentColorHome161" x1="3.145" x2="14.93" y1="1.413" y2="10.981"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#ffd394" />
                                <stop offset="1" stop-color="#ffb357" />
                            </linearGradient>
                            <linearGradient id="fluentColorHome162" x1="10.262" x2="6.945" y1="-.696" y2="7.895"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#ff921f" />
                                <stop offset="1" stop-color="#eb4824" />
                            </linearGradient>
                        </defs>
                    </g>
                </svg>
            </li>
            <!-- 新闻 -->
            <li @click="changeMenu('/news')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <g fill="none">
                        <path fill="url(#fluentColorNews166)"
                            d="M13 4a2 2 0 0 1 2 2v4.5a2.5 2.5 0 0 1-2.5 2.5l-.023-9z" />
                        <path fill="url(#fluentColorNews160)"
                            d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z" />
                        <path fill="url(#fluentColorNews161)"
                            d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z" />
                        <path fill="url(#fluentColorNews162)"
                            d="M1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8.95q-.243.05-.5.05h-9A2.5 2.5 0 0 1 1 10.5z" />
                        <path fill="url(#fluentColorNews163)"
                            d="M3.5 7a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                        <path fill="url(#fluentColorNews164)"
                            d="M7.5 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                        <path fill="url(#fluentColorNews165)" d="M3.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                        <defs>
                            <linearGradient id="fluentColorNews160" x1="4.429" x2="13.346" y1=".308" y2="12.311"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#3bd5ff" />
                                <stop offset="1" stop-color="#367af2" />
                            </linearGradient>
                            <linearGradient id="fluentColorNews161" x1="7.857" x2="7.857" y1="10.885" y2="13"
                                gradientUnits="userSpaceOnUse">
                                <stop offset=".181" stop-color="#2764e7" stop-opacity="0" />
                                <stop offset="1" stop-color="#2764e7" />
                            </linearGradient>
                            <linearGradient id="fluentColorNews162" x1="7.429" x2="11.535" y1="5.385" y2="16.126"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#dcf8ff" stop-opacity="0" />
                                <stop offset="1" stop-color="#ff6ce8" stop-opacity="0.7" />
                            </linearGradient>
                            <linearGradient id="fluentColorNews163" x1="3.286" x2="4.787" y1="6.853" y2="9.857"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#defcff" />
                                <stop offset="1" stop-color="#9ff0f9" />
                            </linearGradient>
                            <linearGradient id="fluentColorNews164" x1="7.35" x2="7.728" y1="7.053" y2="10.301"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#fdfdfd" />
                                <stop offset="1" stop-color="#cceaff" />
                            </linearGradient>
                            <linearGradient id="fluentColorNews165" x1="3.7" x2="3.721" y1="5.018" y2="6.115"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#fdfdfd" />
                                <stop offset="1" stop-color="#cceaff" />
                            </linearGradient>
                            <radialGradient id="fluentColorNews166" cx="0" cy="0" r="1"
                                gradientTransform="matrix(-4.03753 4.94997 -7.38959 -6.02744 16.514 5.35)"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#068beb" />
                                <stop offset=".617" stop-color="#0056cf" />
                                <stop offset=".974" stop-color="#0027a7" />
                            </radialGradient>
                        </defs>
                    </g>
                </svg>
            </li>
            <!-- 代办 -->
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <g fill="none">
                        <path fill="url(#fluentColorCheckbox160)"
                            d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2z" />
                        <path fill="url(#fluentColorCheckbox161)"
                            d="m10.854 6.854l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 9.293l3.146-3.147a.5.5 0 0 1 .708.708" />
                        <defs>
                            <linearGradient id="fluentColorCheckbox160" x1="2.429" x2="10.71" y1="4.25" y2="12.854"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#36dff1" />
                                <stop offset="1" stop-color="#2764e7" />
                            </linearGradient>
                            <linearGradient id="fluentColorCheckbox161" x1="6.154" x2="8.802" y1="6.346" y2="14.902"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#fff" />
                                <stop offset="1" stop-color="#b3e0ff" />
                            </linearGradient>
                        </defs>
                    </g>
                </svg>
            </li>
            <!-- 笔记 -->
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none">
                        <path fill="url(#fluentColorClipboardTextEdit240)"
                            d="M6 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.546L20 15.875V6a2 2 0 0 0-2-2z" />
                        <path fill="url(#fluentColorClipboardTextEdit241)" fill-opacity="0.9"
                            d="M8 9a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2z" />
                        <path fill="url(#fluentColorClipboardTextEdit242)" fill-opacity="0.9"
                            d="M8 13a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z" />
                        <path fill="url(#fluentColorClipboardTextEdit243)" fill-opacity="0.9"
                            d="M7 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" />
                        <path fill="url(#fluentColorClipboardTextEdit249)" fill-opacity="0.4"
                            d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z" />
                        <path fill="url(#fluentColorClipboardTextEdit24a)" fill-opacity="0.4"
                            d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z" />
                        <path fill="url(#fluentColorClipboardTextEdit24b)" fill-opacity="0.4"
                            d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z" />
                        <path fill="url(#fluentColorClipboardTextEdit244)"
                            d="M8 4a2 2 0 0 0 2 2h4a2 2 0 1 0 0-4h-4a2 2 0 0 0-2 2" />
                        <path fill="url(#fluentColorClipboardTextEdit245)"
                            d="M20.585 14.456h-3.241l-4.142 4.146a3 3 0 0 0-.178.196v3.208h3.25a3 3 0 0 0 .171-.157l4.14-4.144z" />
                        <path fill="url(#fluentColorClipboardTextEdit246)"
                            d="M16.28 21.998a2.7 2.7 0 0 1-1.087.556l-1.837.46a1.09 1.09 0 0 1-1.322-1.324l.459-1.84a2.7 2.7 0 0 1 .534-1.06a4.3 4.3 0 0 0 3.252 3.208" />
                        <path fill="url(#fluentColorClipboardTextEdit247)"
                            d="m17.574 14.235l1.56-1.562a2.29 2.29 0 0 1 3.244 0c.896.896.896 2.35 0 3.246l-1.44 1.443z" />
                        <path fill="url(#fluentColorClipboardTextEdit248)"
                            d="M21.824 16.477a4.3 4.3 0 0 1-3.262-3.249l-1.227 1.228a4.3 4.3 0 0 0 3.263 3.249z" />
                        <defs>
                            <linearGradient id="fluentColorClipboardTextEdit240" x1="4" x2="18.146" y1="5.8" y2="23.483"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#36dff1" />
                                <stop offset="1" stop-color="#0094f0" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit241" x1="13.25" x2="5.852" y1="19"
                                y2="9.937" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#9deaff" />
                                <stop offset="1" stop-color="#fff" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit242" x1="13.25" x2="5.852" y1="19"
                                y2="9.937" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#9deaff" />
                                <stop offset="1" stop-color="#fff" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit243" x1="13.25" x2="5.852" y1="19"
                                y2="9.937" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#9deaff" />
                                <stop offset="1" stop-color="#fff" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit244" x1="12" x2="12" y1="6" y2="2"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#fab500" />
                                <stop offset="1" stop-color="#ffe06b" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit245" x1="15.03" x2="18.73" y1="16.308"
                                y2="20.018" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#ffa43d" />
                                <stop offset="1" stop-color="#fb5937" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit246" x1="11.387" x2="14.456" y1="19.976"
                                y2="23.042" gradientUnits="userSpaceOnUse">
                                <stop offset=".255" stop-color="#ffd394" />
                                <stop offset="1" stop-color="#ff921f" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit247" x1="21.904" x2="19.926" y1="13.116"
                                y2="15.016" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#f97dbd" />
                                <stop offset="1" stop-color="#dd3ce2" />
                            </linearGradient>
                            <linearGradient id="fluentColorClipboardTextEdit248" x1="19.657" x2="16.488" y1="16.292"
                                y2="14.902" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#ff921f" />
                                <stop offset="1" stop-color="#ffe994" />
                            </linearGradient>
                            <radialGradient id="fluentColorClipboardTextEdit249" cx="0" cy="0" r="1"
                                gradientTransform="matrix(-6.5 0 0 -7.75283 12 .5)" gradientUnits="userSpaceOnUse">
                                <stop offset=".056" stop-color="#0a1852" />
                                <stop offset="1" stop-color="#0a1852" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient id="fluentColorClipboardTextEdit24a" cx="0" cy="0" r="1"
                                gradientTransform="matrix(-6.5 0 0 -8.40275 12 .5)" gradientUnits="userSpaceOnUse">
                                <stop offset=".056" stop-color="#0a1852" />
                                <stop offset="1" stop-color="#0a1852" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient id="fluentColorClipboardTextEdit24b" cx="0" cy="0" r="1"
                                gradientTransform="matrix(-7.49998 6.99996 -3.13742 -3.36153 17.5 17)"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#0a1852" />
                                <stop offset="1" stop-color="#0a1852" stop-opacity="0" />
                            </radialGradient>
                        </defs>
                    </g>
                </svg>
            </li>
            <!-- 设置 -->
            <li @click="changeMenu('/setting')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <g fill="none">
                        <path fill="url(#fluentColorWrench160)"
                            d="M11 1a4 4 0 0 0-3.896 4.91l-5.05 5.235a1.986 1.986 0 0 0 2.842 2.774l5.006-5.072a4.003 4.003 0 0 0 5.062-4.382a.5.5 0 0 0-.849-.287L12 6.293L9.707 4l2.115-2.115a.5.5 0 0 0-.287-.85A4 4 0 0 0 11 1" />
                        <defs>
                            <linearGradient id="fluentColorWrench160" x1="6.984" x2="9.394" y1="1.844" y2="14.986"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2bdabe" />
                                <stop offset="1" stop-color="#0067bf" />
                            </linearGradient>
                        </defs>
                    </g>
                </svg>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function changeMenu(path) {
    router.push(path);
}
</script>
<style lang="less" scoped>
.side-menu {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background-color: var(--bgColorDefaut);
    border-radius: 12px;
    box-shadow: var(--shadow);
    width: 60px;
    z-index: 99999;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            width: 36px;
            height: 36px;
            background-color: var(--bgColorDefaut);
            margin: 12px;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px;
        }

        li:hover {
            box-shadow: var(--shadow);
        }
    }
}

// 媒体查询 小屏幕 菜单放最下
@media screen and (max-width: 768px) {
    .side-menu {
        top: unset;
        bottom: 12px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 320px;
        width: 90%;
        padding: 0 8px;
        height: 60px;

        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
}
</style>
