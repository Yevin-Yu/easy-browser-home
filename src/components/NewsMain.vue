<template>
    <el-dialog :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }" v-model="isShow"
        :close-on-click-modal="false" :modal="false" top="50px" title="新闻榜单" width="calc(100% - 160px)"
        :before-close="closeDialog">
        <div class="news-main" ref="newsMain" @scroll="handleScroll">
            <div class="item-card" v-for="it in newsList" :key="it" ref="itemCards">
                <div v-if="data[it]">
                    <div class="title" @click="openMore(data[it])"> {{ data[it].title }}</div>
                    <ul>
                        <li v-for="(item, index) in data[it].data.slice(0, 10) " :key="item.id">
                            <span :style="{ 'background-color': colors[index] }">{{ index + 1 }}</span>
                            <a :href="item.url" target="_blank"> {{ item.title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { reactive, nextTick, watchEffect } from "vue";
import { storeToRefs } from 'pinia'
//  快捷键 空格 快速回到主页 并focus 搜索框
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, onMounted, onBeforeUnmount, effect } from 'vue';
const isShow = ref(true)
// 设置弹窗关闭
function closeDialog() {
    isShow.value = false
    // 跳转到首页
    router.push('/');
}
// 获取屏幕尺寸 低于500式 为移动端
const isMobile = ref(false)
const screenWidth = ref(document.documentElement.clientWidth)
if (screenWidth.value < 500) {
    isMobile.value = true
}
// 获取新闻数据

const colors = ["#ea444d", "#ed702d", "#eead3f"];

// 获取用户数据
import { useUserStore } from '@/stores/useAuthStore'
let { updateNewList } = useUserStore()
let { newsList } = storeToRefs(useUserStore());

// 新闻列表 可视区 懒加载   
const observer = ref(null);
const newsMain = ref(null)
const itemCards = ref([]);
const data = reactive({}); // new data
const createObserver = () => {
    const options = {
        root: newsMain.value, // 观察的根元素
        threshold: 0.5 // 交叉比例阈值
    };
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = itemCards.value.indexOf(entry.target); // 获取当前元素的索引
            if (index === -1) return; // 如果索引不存在，则跳过
            const key = newsList.value[index]; // 获取对应的新闻列表的key   
            if (entry.isIntersecting && !data[key]) {
                loadNewDataByKey(key); // 加载对应的数据
            }
        });
    }, options);

    itemCards.value.forEach(card => {
        observer.value.observe(card);
    });
};

const loadNewDataByKey = (key) => {
    fetch(`https://yuwb.cn/news-api/${key}?cache=true`)
        .then((res) => res.json())
        .then((res) => {
            data[key] = res;
        });
}
// 监听新闻列表变化
watchEffect(() => {
    if (newsList.value.length > 0) {
        nextTick(() => {
            if (observer.value) {
                observer.value.disconnect();
            }
            createObserver();
        })
    }
})
onMounted(() => {
    // 等待 DOM 更新完成后再创建观察器
    nextTick(() => {
        if (newsList.value.length > 0) createObserver();
    })
});
// 卸载观察器
onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
});
// 新闻跳转
const openMore = (it) => {
    window.open(it.link, '_blank')
}
// 新闻列表排序
import Sortable from "sortablejs";
onMounted(() => {
    nextTick(() => {
        // 移动端不排序
        if (isMobile.value) return
        Sortable.create(newsMain.value, {
            group: "shared",
            animation: 150,
            ghostClass: "ghost",
            onEnd: ({ newIndex, oldIndex }) => {
                const item = newsList.value.splice(oldIndex, 1)[0];
                newsList.value.splice(newIndex, 0, item);
                // 同步新闻列表
                updateNewList(newsList.value)
            },
        });
    })
})
</script>

<style lang="less" scoped>
.news-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.news-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.news-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item-card {
        flex: 1;
        min-width: 280px;
        height: 400px;
        margin: 10px;
        margin-bottom: 20px;
        border-radius: 8px;
        background: var(--bgColor);
        box-shadow: var(--newsShadow);
        border: var(--border);
        color: var(--fontColor);
        padding: 16px 16px;
        // 拖动样式 
        cursor: move;

        .title {
            font-size: 18px;
            margin-bottom: 10px;
            cursor: pointer;
        }

        ul {
            padding: 10px;
            list-style: none;
            padding: 0;

            li {
                font-size: 14px;
                line-height: 34px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                padding-left: 32px;

                span {
                    position: absolute;
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    top: 6px;
                    left: 0;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 5px;
                    background-color: #ccc;
                }

                a {
                    color: var(--fontColor);
                    text-decoration: none;
                }
            }
        }
    }
}
</style>