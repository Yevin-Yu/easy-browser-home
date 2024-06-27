import { ref } from 'vue';
import Cookies from 'js-cookie';

export function useCookieAuth(cookieName = 'token') {
  // 初始化token状态
  const token = ref(Cookies.get(cookieName) || '');

  // 设置token方法
  function setToken(newToken, options = {}) {
    // 可以自定义过期时间等选项
    Cookies.set(cookieName, newToken, options);
    token.value = newToken;
  }

  // 获取token方法
  function getToken() {
    return token.value;
  }

  // 删除token方法
  function removeToken() {
    Cookies.remove(cookieName);
    token.value = '';
  }

  return {
    token,
    setToken,
    getToken,
    removeToken,
  };
}