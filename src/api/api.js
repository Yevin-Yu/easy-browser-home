// src/api.js
import axios from 'axios';

// 创建 Axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // 替换为你的 API 基础 URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从 localStorage 或其他地方获取 token
        const token = localStorage.getItem('token');
        if (token) {
            // 设置 Authorization 头
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        return response.data; // 直接返回数据
    },
    (error) => {
        // 处理错误
        if (error.response && error.response.status === 401) {
            // 处理未授权的情况，例如重定向到登录页面
            console.error('Unauthorized, redirecting to login...');
            // 删除 token
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

// 封装API方法
const api = {
    get(url, params = {}) {
        return apiClient.get(url, { params });
    },
    post(url, data = {}) {
        return apiClient.post(url, data);
    },
};

export default api;