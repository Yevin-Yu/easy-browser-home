<template>
  <div class="setting">
    <el-button class="close" @click="closeSetting" circle>关</el-button>
    欢迎！<span>{{ username }}</span>
    <div class="content">
      <div class="item"></div>
    </div>
  </div>
</template>
<script setup>
import { useCookieAuth } from '@/hook/useAuth';
import { ref, onMounted ,defineEmits} from 'vue';
import axios from 'axios';


const { token, setToken, removeToken } = useCookieAuth();
const username = ref('')
onMounted(() => {
    axios.get('/api/user/info', ).then(res => {
        if (res.status === 200) {
            username.value = res.data.username
        }
    })
})
const emit = defineEmits(['closeSetting']);
function closeSetting(){
    emit('closeSetting')
}
</script>
<style scoped>
.setting {
    z-index: 999;
    width: 50%;
    min-height: 500px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 8px;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
    color: #eee;
}

.content {
    display: flex;
}
.close{
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: rgba(255, 255, 255, 0.4);
    color: #fff;
}
</style>
