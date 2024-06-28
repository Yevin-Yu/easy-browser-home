// src/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  // baseURL: 'https://api.yuwb.cn',
  baseURL: 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，用于添加token等信息
axiosInstance.interceptors.request.use(config => {
  // 获取可能存在的token，这里以从localStorage获取为例
  const token = Cookies.get('token') || '';
  if (token) {
    // 如果有token，就加入到headers中
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default axiosInstance;