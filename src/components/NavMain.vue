<template>
    <div class="nav-main">
        <ul ref="navsList">
            <li v-for="item in navItems" @click="go(item)" :key="item.name">
                <img :src="item.iconPath" alt="link" @error="onImageError(item)" />
                <span class="nav-item-name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const navItems = ref(
    [
        {
            "id": 81,
            "name": "谷歌",
            "linkPath": "https://www.google.com",
            "iconPath": "https://www.google.com/favicon.ico"
        },
        {
            "id": 99,
            "name": "耶温博客",
            "linkPath": "https://yuwb.cn",
            "iconPath": ""
        },
        {
            "id": 175,
            "name": "Format",
            "linkPath": "https://yuwb.cn/format/",
            "iconPath": ""
        },
        {
            "id": 172,
            "name": "Duck.ai",
            "linkPath": "https://duck.ai",
            "iconPath": "https://duckduckgo.com/favicon.ico"
        },
        {
            "id": 173,
            "name": "石墨文档",
            "linkPath": "https://shimo.im/recent",
            "iconPath": "https://as.smgv.cn/static/lizard-one/assets/icons/favicon.f921e86f.ico"
        },
        {
            "id": 141,
            "name": "X",
            "linkPath": "https://x.com/home",
            "iconPath": "https://abs.twimg.com/favicons/twitter.3.ico"
        },
        {
            "id": 80,
            "name": "百度",
            "linkPath": "https://www.baidu.com",
            "iconPath": "https://www.baidu.com/favicon.ico"
        },
        {
            "id": 78,
            "name": "通义千问",
            "linkPath": "https://tongyi.aliyun.com",
            "iconPath": "https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png"
        },
        {
            "id": 79,
            "name": "必应",
            "linkPath": "https://cn.bing.com",
            "iconPath": "https://cn.bing.com/favicon.ico"
        },
        {
            "id": 88,
            "name": "微博",
            "linkPath": "https://weibo.com",
            "iconPath": "https://weibo.com/favicon.ico"
        },
        {
            "id": 84,
            "name": "掘金",
            "linkPath": "https://juejin.cn",
            "iconPath": "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png"
        },
        {
            "id": 85,
            "name": "CSDN",
            "linkPath": "https://www.csdn.net",
            "iconPath": "https://www.csdn.net/favicon.ico"
        },
        {
            "id": 82,
            "name": "GitHub",
            "linkPath": "https://github.com/Yevin-Yu",
            "iconPath": "https://github.com/favicon.ico"
        },
        {
            "id": 89,
            "name": "知乎",
            "linkPath": "https://www.zhihu.com",
            "iconPath": "https://static.zhihu.com/heifetz/favicon.ico"
        },
        {
            "id": 83,
            "name": "MDN",
            "linkPath": "https://developer.mozilla.org/zh-CN",
            "iconPath": "https://developer.mozilla.org/favicon.ico"
        },
        {
            "id": 86,
            "name": "抖音",
            "linkPath": "https://www.douyin.com",
            "iconPath": "https://www.douyin.com/favicon.ico"
        },
        {
            "id": 87,
            "name": "B站",
            "linkPath": "https://www.bilibili.com",
            "iconPath": "https://www.bilibili.com/favicon.ico"
        },
        {
            "id": 90,
            "name": "豆瓣",
            "linkPath": "https://www.douban.com",
            "iconPath": "https://www.douban.com/favicon.ico"
        },
        {
            "id": 91,
            "name": "淘宝",
            "linkPath": "https://www.taobao.com",
            "iconPath": "https://www.taobao.com/favicon.ico"
        },
        {
            "id": 92,
            "name": "京东",
            "linkPath": "https://www.jd.com",
            "iconPath": "https://www.jd.com/favicon.ico"
        },
        {
            "id": 93,
            "name": "苏宁",
            "linkPath": "https://www.suning.com",
            "iconPath": "https://www.suning.com/favicon.ico"
        },
        {
            "id": 94,
            "name": "爱奇艺",
            "linkPath": "https://www.iqiyi.com",
            "iconPath": "https://www.iqiyi.com/favicon.ico"
        },
        {
            "id": 95,
            "name": "优酷",
            "linkPath": "https://www.youku.com",
            "iconPath": "https://www.youku.com/favicon.ico"
        },
        {
            "id": 96,
            "name": "腾讯视频",
            "linkPath": "https://v.qq.com",
            "iconPath": "https://v.qq.com/favicon.ico"
        },
        {
            "id": 97,
            "name": "芒果TV",
            "linkPath": "https://www.mgtv.com",
            "iconPath": "https://www.mgtv.com/favicon.ico"
        },
        {
            "id": 98,
            "name": "网易",
            "linkPath": "https://www.163.com",
            "iconPath": "https://www.163.com/favicon.ico"
        },
        {
            "id": 174,
            "name": "配色网站",
            "linkPath": "https://aicolors.co",
            "iconPath": ""
        }
    ])
function go(item) {
    window.open(item.linkPath);
}
// 图片加载失败
function onImageError(item) {
    item.iconPath = "https://yuwb.cn/nav/pwa.png";
}
</script>

<style lang="less" scoped>
.nav-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.nav-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.nav-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;

    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        justify-content: center;

        li {
            display: inline-block;
            margin: 12px 18px;
            text-align: center;
            width: 60px;

            img {
                display: block;
                padding: 18px;
                background-color: #fff;
                width: 60px;
                height: 60px;
                border-radius: 15px;
                background-color: var(--bgColorDefaut);
                overflow: hidden;
                cursor: pointer;

                // 
                &:hover {
                    box-shadow: var(--activeShadow);
                }
            }

            .nav-item-name {
                display: block;
                width: 60px;
                padding-top: 12px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: var(--fontColorDefaut);
                line-height: 12px;
            }
        }
    }
}
</style>