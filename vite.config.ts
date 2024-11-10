import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nav/',
  // 配置代理
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.yuwb.cn', // 你希望代理到的目标服务器地址
  //       changeOrigin: true, // 是否开启代理服务器的跨域
  //       rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，可选
  //     },
  //   },
  // },
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({ 
      // 应用清单
      manifest: {
        name: '耶温导航',
        short_name: '导航',
        description: '耶温导航-搜索、收藏网站、备忘录、待办',
        theme_color: '#ccc',
        icons: [
          {
            src: 'pwa.webp',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'pwa.webp',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa.webp',
            sizes: '1024x1024',
            type: 'image/png'
          }
        ]
      },
      // 注册ws方式
      injectRegister: 'auto',
      // 设置缓存资源
      workbox: {
        globPatterns: ['**/*.{css,html,ico,png,svg,json,jpg,jpeg}']
      },
      //dev环境也开启pwa
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
